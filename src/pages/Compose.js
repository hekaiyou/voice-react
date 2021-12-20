import React, { useState, useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import EditReactDialog from '../components/EditReactDialog.js';
import BroadcastDialog from '../components/BroadcastDialog.js';
import FillingDialog from '../components/FillingDialog.js';
import axios from 'axios';

function handleScriptsAnalysis(scriptLists) {
    let avDescribe = '';
    let avList = [];
    for (var i in scriptLists) {
        let av = scriptLists[i];
        if (av.indexOf('#') === -1) {
            avList.push({ 'text': scriptLists[i], 'describe': avDescribe });
            avDescribe = '';
        } else {
            let avSplit = scriptLists[i].split('#')
            if (avSplit[0].trim() === '') {
                avDescribe += avSplit[1].trim();
            }
        }
    };
    return avList;
};

function Compose() {
    const [openEdit, setOpenEdit] = useState(false);
    const [openBroadcast, setOpenBroadcast] = useState(false);
    const [openFilling, setOpenFilling] = useState(false);
    const [scriptList, setScriptList] = useState([]);
    const [currentItem, setCurrentItem] = useState({});
    const [url, setUrl] = useState('');
    const [fillList, setFillList] = useState([]);
    const [currentItemList, setCurrentItemList] = useState([]);
    const [language, setLanguage] = useState('auto');

    useEffect(() => {
        handleScriptList('');
        // eslint-disable-next-line
    }, []);

    const handleScriptList = (searchValue) => {
        axios.get('/api/1.0/script', {
            params: {
                search: searchValue,
            }
        }).then(function (response) {
            setScriptList(response.data);
        }).catch(function (error) {
            console.log(error);
        });
    };

    const handleTextFieldChange = (e) => {
        let newSearchValue = e.target.value;
        handleScriptList(newSearchValue);
    };

    const handleClickOpenEdit = (item) => {
        if (!item.language) {
            item['language'] = 'auto';
        }
        setLanguage(item.language);
        setCurrentItem(item);
        setOpenEdit(true);
    };

    const handleClickOpenBroadcast = (item) => {
        let scriptLists = item['script'].split(/[\n]/).filter(_ => _);
        let reg = /(?<={).*?(?=(}|$))/g;
        let valueList = [];
        setLanguage(item.language);
        if (item['script'].search(reg) !== -1) {
            item['script'].match(reg).map(function (v) {
                if (valueList.indexOf(v) === -1) {
                    valueList.push(v);
                }
                return null;
            });
            setCurrentItem(item);
            setFillList(valueList);
            handleOpenFilling();
        } else {
            let analysisList = handleScriptsAnalysis(scriptLists)
            handlePlay(analysisList[0]['text'], item.language);
            setCurrentItem(item);
            setCurrentItemList(analysisList);
            setOpenBroadcast(true);
        }
    };

    const handleOpenFilling = () => {
        setOpenFilling(true);
    }

    const handleCloseEdit = (result) => {
        setOpenEdit(false);
        if (result) {
            let oldSearchValue = document.getElementById('search').value;
            handleScriptList(oldSearchValue);
        }
    };

    const handleCloseBroadcast = () => {
        setOpenBroadcast(false);
        let oldSearchValue = document.getElementById('search').value;
        handleScriptList(oldSearchValue);
    };

    const handleCloseFilling = () => {
        setOpenFilling(false);
    };

    const handlePlay = (playText, languageValue) => {
        if (playText !== '') {
            let newUrl = '/api/1.0/tts?text=' + playText + '&language=' + languageValue;
            if (newUrl !== url) {
                setUrl(newUrl);
            } else {
                let ttsAudio = document.getElementById('tts-audio-script');
                ttsAudio.play();
            }
        }
    };

    const handleSaveFilling = (fillDict) => {
        setOpenFilling(false);
        let nowDict = currentItem;
        let nowcItem = nowDict['script'];
        for (var key in fillDict) {
            let repKey = '{' + key + '}';
            nowcItem = nowcItem.split(repKey).join(fillDict[key]);
        }
        if (Object.keys(fillDict).length === 0) {
            nowcItem = nowcItem.split('{').join('');
            nowcItem = nowcItem.split('}').join('');
        }
        let scriptLists = nowcItem.split(/[\n]/).filter(_ => _);
        let analysisList = handleScriptsAnalysis(scriptLists)
        nowDict['script'] = nowcItem;
        handlePlay(analysisList[0]['text'], nowDict['language']);
        setCurrentItem(nowDict);
        setCurrentItemList(analysisList);
        setOpenBroadcast(true);
    }

    return (
        <div>
            <TextField id="search" onChange={handleTextFieldChange} label="Search Script" fullWidth />
            <p />
            <List>
                {scriptList.map((item) => (
                    <ListItem button key={item.id} onClick={() => { handleClickOpenBroadcast(item) }}>
                        <ListItemText primary={item.title} />
                        <ListItemSecondaryAction onClick={() => { handleClickOpenEdit(item) }}>
                            <IconButton edge="end" aria-label="edit">
                                <EditIcon />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <p />
            <Button variant="contained" color="primary" fullWidth onClick={() => { handleClickOpenEdit({}) }}>
                Create New Script
            </Button>
            <EditReactDialog open={openEdit} onClose={handleCloseEdit} currentDict={currentItem} language={language} setLanguage={setLanguage} />
            <BroadcastDialog open={openBroadcast} onClose={handleCloseBroadcast} currentDict={currentItem} setUrl={setUrl} handlePlay={handlePlay} currentItemList={currentItemList} language={language} />
            <FillingDialog open={openFilling} onClose={handleCloseFilling} fillList={fillList} onSave={handleSaveFilling} />
            <audio controls id="tts-audio-script" autoPlay src={url} type="audio/wav" hidden>
                Your browser does not support the audio element.
            </audio>
        </div>
    );
}

export default Compose;
