import React from "react"
import { Button } from "antd"
import { useCurrency } from "../Context/CurrencyContext"

const CurrencySelector: React.FC = () => {
    const { currency, setCurrency } = useCurrency()

    const handleCurrencyChange = (currency: string) => {
        setCurrency(currency)
    }

    return (
        <div>
            <Button
                onClick={() => handleCurrencyChange("USD")}
                type={currency === "USD" ? "default" : "primary"}
                style={{ marginRight: 10 }}
            >
                USD
            </Button>
            <Button
                onClick={() => handleCurrencyChange("EUR")}
                type={currency === "EUR" ? "default" : "primary"}
                style={{ marginRight: 10 }}
            >
                EUR
            </Button>
            <Button
                onClick={() => handleCurrencyChange("RUB")}
                type={currency === "RUB" ? "default" : "primary"}
            >
                RUB
            </Button>
        </div>
    )
}

export default CurrencySelector
