import React, { useEffect, useState } from "react";

import { i18nextCommon } from "@transitionpt/translations";

export default function Header(menuOptionsJson) {
    const [currentLang, setLang] = useState("pt");
    i18nextCommon.changeLanguage(currentLang);
    
    /**
     * read:
     * https://javascript.plainenglish.io/npm-i18n-internationalization-25da8201b3b8
     * https://medium.com/@sisosys7/a-monorepo-setup-with-lerna-react-and-typescript-7b912fb48622
     */
    function changeHeaderLanguage() {
        //i18nextCommon.changeLanguage("en");
        setLang("en");
        const customEvent = new CustomEvent('newLang', { detail: "en" });
        window.dispatchEvent(customEvent)
    }

    return (
        <div>
            <p>this is header generic module { i18nextCommon.t('Notification.DOWNLOAD.success') }</p>
            <button onClick={changeHeaderLanguage}>Change language</button>
        </div>
    )
}