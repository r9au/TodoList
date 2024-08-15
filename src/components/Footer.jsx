import React from 'react'
import { useTranslation } from 'react-i18next'
const Footer = () => {
  const {t}=useTranslation()
  return (
    <div className='m-0 p-3 bg-blue-600 flex '>
      <div className="copy flex mx-auto gap-3">
        <div className="text-xl text-white">
            {t("All")} {t("rights")} {t("Reserved")} {t("at")} {t("Todomasterapp")}
        </div>
        <div className="cpy text-xl text-white">&copy;</div>
      </div>
    </div>
  )
}

export default Footer
