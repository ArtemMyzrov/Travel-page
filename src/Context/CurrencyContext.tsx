import React, { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"
import { message, Spin } from "antd"
import '../index.css'

interface CurrencyContextType {
    currency: string
    exchangeRates: Record<string, number>
    setCurrency: (currency: string) => void
    loading: boolean
    error: string | null
}

interface CurrencyProviderProps {
    children: React.ReactNode
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined)

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
    const [currency, setCurrency] = useState<string>("USD")
    const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({
        EUR: 1,
        USD: 1,
        RUB: 1
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const fetchExchangeRates = async () => {
        setLoading(true)
        setError(null)
        try {
            const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/USD`)
            setExchangeRates({
                EUR: response.data.rates["EUR"],
                USD: 1,
                RUB: response.data.rates["RUB"]
            })
        } catch (error) {
            console.error("Error fetching exchange rates", error)
            setError("Ошибка загрузки курса валют")
            message.error("Ошибка загрузки курса валют")
        } finally {
            setLoading(false)
        }
    }

    const changeCurrency = (newCurrency: string) => {
        setCurrency(newCurrency)
    }

    useEffect(() => {
        fetchExchangeRates()
    }, [])

    return (
        <CurrencyContext.Provider value={{ currency, exchangeRates, setCurrency: changeCurrency, loading, error }}>
            {loading ? <Spin size='large' className="spin" /> : children}
        </CurrencyContext.Provider>
    )
}

export const useCurrency = (): CurrencyContextType => {
    const context = useContext(CurrencyContext)
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider")
    }
    return context
}
