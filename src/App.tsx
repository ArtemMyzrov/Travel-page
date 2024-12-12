import React, { useState } from "react"
import { Layout, Row, Col } from "antd"
import TicketsList from "./Tickets/TicketsList"
import Filters from "./Filters/Filters"
import ticketsData from "./Tickets/tickets.json"

const { Content, Sider } = Layout

const App: React.FC = () => {
  const [filteredTickets, setFilteredTickets] = useState(ticketsData.tickets)

  const handleFilterChange = (stops: number[]) => {

    if (stops.length === 0) {
      setFilteredTickets([])
    } else {
      const filtered = ticketsData.tickets.filter((ticket) =>
        stops.includes(ticket.stops)
      )
      setFilteredTickets(filtered)
    }
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={300} style={{ background: "#fff", padding: "20px" }}>
        <Filters onFilterChange={handleFilterChange} />
      </Sider>
      <Layout>
        <Content style={{ padding: "20px" }}>
          <Row justify="center">
            <Col span={16}>
              {filteredTickets.length === 0 ? (
                <p>Выберите количество пересадок</p>
              ) : (
                <TicketsList tickets={filteredTickets} />
              )}
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App
