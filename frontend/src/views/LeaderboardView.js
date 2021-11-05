import Axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  ButtonGroup,
  Col,
  Container,
  Row,
  Table,
  ToggleButton,
} from 'react-bootstrap';

export default function LeaderboardView() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [filterDate, setFilterDate] = useState('all');
  useEffect(() => {
    (async () => {
      try {
        const { data } = await Axios.get(
          `/api/tournament-results/leaderboard?filter=${filterDate}`,
        );
        setLeaderboardData(data);
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [filterDate]);
  return (
    <Container>
      <Row style={{ marginTop: '1rem' }}>
        <Col md={3}>
          <ButtonGroup>
            <ToggleButton
              id="radioAllDate"
              type="radio"
              name="radio"
              value="all"
              variant="outline-dark"
              checked={filterDate === 'all'}
              onChange={(e) => setFilterDate(e.currentTarget.value)}
            >
              All Time
            </ToggleButton>
            <ToggleButton
              id="radioMonth"
              type="radio"
              name="radio"
              value="month"
              variant="outline-dark"
              checked={filterDate === 'month'}
              onChange={(e) => setFilterDate(e.currentTarget.value)}
            >
              Bulan ini
            </ToggleButton>
            <ToggleButton
              id="radioWeek"
              type="radio"
              name="radio"
              value="week"
              variant="outline-dark"
              checked={filterDate === 'week'}
              onChange={(e) => setFilterDate(e.currentTarget.value)}
            >
              Minggu ini
            </ToggleButton>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Table
            style={{ marginTop: '1rem' }}
            striped
            bordered
            hover
            responsive
            variant="dark"
          >
            <thead>
              <tr>
                <th>RANGKING</th>
                <th>TIM / GAME ID</th>
                <th>KAPTEN</th>
                <th>POIN</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((data, index) => (
                <tr key={data._id}>
                  <td>{index + 1}</td>
                  <td>{data.teamName}</td>
                  <td>{data.captainName}</td>
                  <td>{data.totalPoint}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
