import { Children, createContext, useState } from "react";
import { useTranslation } from "react-i18next";
const Lngcontext=createContext()
// const {i18n}=useTranslation()
const Lngprovider=({Children})=>{
     const changelng=({lng})=>{
          i18n.changeLanguage(lng)
     }
    return(
        <Lngcontext.Provider value={{changelng}}>
            {Children}
        </Lngcontext.Provider>
    )
}
export {Lngcontext,Lngprovider}