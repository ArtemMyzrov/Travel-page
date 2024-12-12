import React from "react"
import { Button, Card, Col, Divider, Row, message } from "antd"
import { useCurrency } from "../Context/CurrencyContext"
import styles from "./TicketsList.module.css"

interface Ticket {
    origin: string
    origin_name: string
    destination: string
    destination_name: string
    departure_date: string
    departure_time: string
    arrival_date: string
    arrival_time: string
    carrier: string
    stops: number
    price: number
}

interface TicketsListProps {
    tickets: Ticket[]
}

const TicketsList: React.FC<TicketsListProps> = ({ tickets }) => {
    const { currency, exchangeRates } = useCurrency()

    const getDayOfWeek = (date: string) => {
        const daysOfWeek = ['Воскресенье', 'Понеделник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
        const dateObj = new Date(date)
        return daysOfWeek[dateObj.getDay()]
    }
    const handleBuyClick = () => {
        message.success('Спасибо что выбрали нас , приятного полета!');
    }
    return (
        <div>
            {tickets.sort((a, b) => a.price - b.price).map((ticket, index) => (
                <Card key={index} className={styles.card}>
                    <Row align="middle" gutter={[16, 16]}>
                        <Col span={6} style={{ textAlign: "center", marginRight: '20px' }}>
                            <img
                                src="./Turkish_Airlines_logo.svg"
                                alt="Airline logo"
                                className={styles.cardLogo}
                            />
                            <Button className={styles.cardButton} onClick={handleBuyClick}>
                                Купить
                                <span className={styles.cardButtonSpan}>
                                    за {Math.round(ticket.price * exchangeRates[currency])} {currency}
                                </span>
                            </Button>
                        </Col>
                        <Divider type="vertical" className={styles.divider} />
                        <Col span={12}>
                            <Row justify="space-between" align="middle">
                                <Col>
                                    <div className={styles.departureTime}>
                                        {ticket.departure_time}
                                    </div>
                                    <div className={styles.departureInfo}>
                                        {ticket.origin}, {ticket.origin_name}
                                    </div>
                                    <div className={styles.departureDate}>
                                        {ticket.departure_date} {getDayOfWeek(ticket.departure_date)}
                                    </div>
                                </Col>
                                <Divider
                                    type="vertical"
                                    className={styles.dividerVertical}
                                />
                                <Col className={styles.stopsInfo}>
                                    <div className={styles.stopsText}>
                                        {ticket.stops > 0 ? `${ticket.stops} пересадка` : "Без пересадок"}
                                    </div>
                                    <div className={styles.arrow}>
                                        →
                                    </div>
                                </Col>
                                <Divider
                                    type="vertical"
                                    className={styles.dividerVertical}
                                />
                                <Col>
                                    <div className={styles.arrivalTime}>
                                        {ticket.arrival_time}
                                    </div>
                                    <div className={styles.arrivalInfo}>
                                        {ticket.destination}, {ticket.destination_name}
                                    </div>
                                    <div className={styles.arrivalDate}>
                                        {ticket.arrival_date} {getDayOfWeek(ticket.arrival_date)}
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            ))}
        </div>
    )
}

export default TicketsList
