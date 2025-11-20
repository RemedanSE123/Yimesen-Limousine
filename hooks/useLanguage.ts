'use client'

import { useState, useEffect } from 'react'
import { Language } from '@/lib/i18n'

export function useLanguage(): [Language, (lang: Language) => void] {
  const [lang, setLangState] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) {
      setLangState(savedLang)
    }
  }, [])

  const setLang = (newLang: Language) => {
    localStorage.setItem('language', newLang)
    setLangState(newLang)
    // Reload page to apply language changes
    window.location.reload()
  }

  return [lang, setLang]
}

