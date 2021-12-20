import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

function LanguageSelection(props) {
    const { language, setLanguage } = props;
    const [languageValue] = useState(language);

    const handleSelectClick = (e) => {
        if (e.target.value) {
            setLanguage(e.target.value);
        } else {
            setLanguage('');
        }
    };

    return (
        <FormControl fullWidth>
            <InputLabel htmlFor="grouped-select">Language and speaker</InputLabel>
            <Select defaultValue={languageValue} id="grouped-select" onChange={handleSelectClick}>
                <MenuItem value="auto">Automatic (自动判断)</MenuItem>
                <ListSubheader>Chinese (Cantonese, Traditional)</ListSubheader>
                <MenuItem value="zh-HK-HiuMaanNeural">HiuMaan (Neural) - 曉曼</MenuItem>
                <MenuItem value="zh-HK-HiuGaaiNeural">HiuGaai (Neural) - 曉佳</MenuItem>
                <MenuItem value="zh-HK-WanLungNeural">WanLung (Neural) - 雲龍</MenuItem>
                <ListSubheader>Chinese (Mandarin, Simplified)</ListSubheader>
                <MenuItem value="zh-CN-XiaoxiaoNeural">Xiaoxiao (Neural) - 晓晓</MenuItem>
                <MenuItem value="zh-CN-YunyangNeural">Yunyang (Neural) - 云扬</MenuItem>
                <MenuItem value="zh-CN-XiaoyouNeural">Xiaoyou (Neural) - 晓悠</MenuItem>
                <MenuItem value="zh-CN-YunyeNeural">Yunye (Neural) - 云野</MenuItem>
                <ListSubheader>Chinese (Taiwanese Mandarin)</ListSubheader>
                <MenuItem value="zh-TW-HsiaoChenNeural">HsiaoChen (Neural) - 曉臻</MenuItem>
                <MenuItem value="zh-TW-HsiaoYuNeural">HsiaoYu (Neural) - 曉雨</MenuItem>
                <MenuItem value="zh-TW-YunJheNeural">YunJhe (Neural) - 雲哲</MenuItem>
                <ListSubheader>Dutch</ListSubheader>
                <MenuItem value="nl-NL-ColetteNeural">Colette (Neural)</MenuItem>
                <MenuItem value="nl-NL-FennaNeural">Fenna (Neural)</MenuItem>
                <MenuItem value="nl-NL-MaartenNeural">Maarten (Neural)</MenuItem>
                <ListSubheader>English (Australia)</ListSubheader>
                <MenuItem value="en-AU-NatashaNeural">Natasha (Neural)</MenuItem>
                <MenuItem value="en-AU-WilliamNeural">William (Neural)</MenuItem>
                <ListSubheader>English (Canada)</ListSubheader>
                <MenuItem value="en-CA-ClaraNeural">Clara (Neural)</MenuItem>
                <MenuItem value="en-CA-LiamNeural">Liam (Neural)</MenuItem>
                <ListSubheader>English (India)</ListSubheader>
                <MenuItem value="en-IN-NeerjaNeural">Neerja (Neural)</MenuItem>
                <MenuItem value="en-IN-PrabhatNeural">Prabhat (Neural)</MenuItem>
                <ListSubheader>English (Ireland)</ListSubheader>
                <MenuItem value="en-IE-ConnorNeural">Connor (Neural)</MenuItem>
                <MenuItem value="en-IE-EmilyNeural">Emily (Neural)</MenuItem>
                <ListSubheader>English (UK)</ListSubheader>
                <MenuItem value="en-GB-MiaNeural">Mia (Neural)</MenuItem>
                <MenuItem value="en-GB-LibbyNeural">Libby (Neural)</MenuItem>
                <MenuItem value="en-GB-RyanNeural">Ryan (Neural)</MenuItem>
                <ListSubheader>English (US)</ListSubheader>
                <MenuItem value="en-US-JennyNeural">Jenny (Neural)</MenuItem>
                <MenuItem value="en-US-GuyNeural">Guy (Neural)</MenuItem>
                <MenuItem value="en-US-AriaNeural">Aria (Neural)</MenuItem>
                <ListSubheader>French (Canada)</ListSubheader>
                <MenuItem value="fr-CA-SylvieNeural">Sylvie (Neural)</MenuItem>
                <MenuItem value="fr-CA-AntoineNeural">Antoine (Neural)</MenuItem>
                <MenuItem value="fr-CA-JeanNeural">Jean (Neural)</MenuItem>
                <ListSubheader>French (France)</ListSubheader>
                <MenuItem value="fr-FR-DeniseNeural">Denise (Neural)</MenuItem>
                <MenuItem value="fr-FR-HenriNeural">Henri (Neural)</MenuItem>
                <ListSubheader>French (Switzerland)</ListSubheader>
                <MenuItem value="fr-CH-ArianeNeural">Ariane (Neural)</MenuItem>
                <MenuItem value="fr-CH-FabriceNeural">Fabrice (Neural)</MenuItem>
                <ListSubheader>German (Austria)</ListSubheader>
                <MenuItem value="de-AT-IngridNeural">Ingrid (Neural)</MenuItem>
                <MenuItem value="de-AT-JonasNeural">Jonas (Neural)</MenuItem>
                <ListSubheader>German (Germany)</ListSubheader>
                <MenuItem value="de-DE-KatjaNeural">Katja (Neural)</MenuItem>
                <MenuItem value="de-DE-ConradNeural">Conrad (Neural)</MenuItem>
                <ListSubheader>German (Switzerland)</ListSubheader>
                <MenuItem value="de-CH-JanNeural">Jan (Neural)</MenuItem>
                <MenuItem value="de-CH-LeniNeural">Leni (Neural)</MenuItem>
                <ListSubheader>Italian</ListSubheader>
                <MenuItem value="it-IT-IsabellaNeural">Isabella (Neural)</MenuItem>
                <MenuItem value="it-IT-DiegoNeural">Diego (Neural)</MenuItem>
                <MenuItem value="it-IT-ElsaNeural">Elsa (Neural)</MenuItem>
                <ListSubheader>Japanese</ListSubheader>
                <MenuItem value="ja-JP-NanamiNeural">Nanami (Neural) - 七海</MenuItem>
                <MenuItem value="ja-JP-KeitaNeural">Keita (Neural) - 圭太</MenuItem>
                <ListSubheader>Russian</ListSubheader>
                <MenuItem value="ru-RU-SvetlanaNeural">Svetlana (Neural) - Светлана</MenuItem>
                <MenuItem value="ru-RU-DariyaNeural">Dariya (Neural) - Дария</MenuItem>
                <MenuItem value="ru-RU-DmitryNeural">Dmitry (Neural) - Дмитрий</MenuItem>
                <ListSubheader>Spanish (Mexico)</ListSubheader>
                <MenuItem value="es-MX-DaliaNeural">Dalia (Neural)</MenuItem>
                <MenuItem value="es-MX-JorgeNeural">Jorge (Neural)</MenuItem>
                <ListSubheader>Spanish (Spain)</ListSubheader>
                <MenuItem value="es-ES-AlvaroNeural">Alvaro (Neural) - Álvaro</MenuItem>
                <MenuItem value="es-ES-ElviraNeural">Elvira (Neural)</MenuItem>
            </Select>
        </FormControl>
    );
}

export default LanguageSelection;