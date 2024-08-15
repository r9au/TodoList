import React, { useContext } from 'react'
// import { Lngcontext } from '../contexts/Lngcontext'
import { useTranslation } from 'react-i18next'

const Navbar = () => {
  const {t,i18n}=useTranslation()
  const changelng=(event)=>{
    let lng=event.target.value
    i18n.changeLanguage(lng)
}
  return (
    <div className='m-0 p-4 bg-blue-600 flex justify-between'>
      <div className="head">
        <div className="logo text-3xl text-white mx-1 font-danceScript w-24">{t("TodoList")}</div>
        <div className="desc text-lg text-white mx-1 font-danceScript w-48">{t("Your")} {t("daily")} {t("schedule")} {t("Manager")}</div>
      </div>
      <div className="lang flex">
         <label className='flex justify-around gap-5 font-danceScript text-xl text-white'>
          <span className='mt-5'>{t("Select")} {t("language")}</span>
          <div className="box m-3">
          <select className='p-3 bg-blue-500 border border border-white rounded-lg' onChange={changelng}>
            <option className='text-sm text-white font-sans' value='en'>{t("English")}</option>
            <option className='text-sm text-white font-sans' value='hi'>{t("Hindi")}</option>
            <option className='text-sm text-white font-sans' value='de'>{t("German")}</option>
          </select>
          </div>
         </label>
      </div>
    </div>
  )
}

export default Navbar
