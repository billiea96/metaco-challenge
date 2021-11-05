import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
  ButtonGroup,
  Card,
  Col,
  Container,
  Form,
  Pagination,
  Row,
  ToggleButton,
  Button,
} from 'react-bootstrap';
import Axios from 'axios';

export default function ExplorerView() {
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [pages, setPages] = useState(1);
  const [keyword, setKeyWord] = useState('');
  const [type, setType] = useState('team');
  const defaultImgTeam = '/images/unknown.png';
  const defaultImgUser = '/images/user-unknown.png';
  useEffect(() => {
    (async () => {
      try {
        const keywordParam = keyword ? `keyword=${keyword}&` : '';
        if (type === 'team') {
          const { data } = await Axios.get(
            `/api/teams?${keywordParam}page=${page}&pageSize=${pageSize}`,
          );
          setTeams(data.teams);
          setPages(data.pages);
        } else {
          const { data } = await Axios.get(
            `/api/users?${keywordParam}page=${page}&pageSize=${pageSize}`,
          );
          setUsers(data.users);
          setPages(data.pages);
        }
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, [page, pageSize, type, keyword]);
  return (
    <Container style={{ margin: '1rem' }}>
      <Row>
        <Col md={2}>
          <Form.Select
            aria-label="Default select example"
            value={pageSize}
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value="6">Tampilkan: 6 Data</option>
            <option value="12">Tampilkan: 12 Data</option>
            <option value="18">Tampilkan: 18 Data</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={keyword}
            onInput={(e) => setKeyWord(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Button variant="dark" onClick={(e) => setKeyWord('')}>
            Clear
          </Button>
        </Col>
      </Row>
      <Row style={{ marginTop: '1rem' }}>
        <Col md={2}>
          <ButtonGroup>
            <ToggleButton
              id="radioTeam"
              type="radio"
              name="radio"
              value="team"
              variant="outline-dark"
              checked={type === 'team'}
              onChange={(e) => setType(e.currentTarget.value)}
            >
              Team
            </ToggleButton>
            <ToggleButton
              id="radioPlayer"
              type="radio"
              name="radio"
              value="player"
              variant="outline-dark"
              checked={type === 'player'}
              onChange={(e) => setType(e.currentTarget.value)}
            >
              Player
            </ToggleButton>
          </ButtonGroup>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        {type === 'team' &&
          teams.map((team) => (
            <Col md={2} key={team._id}>
              <Card
                style={{ width: '12rem', margin: '1rem' }}
                className="text-center"
              >
                <Card.Img
                  variant="top"
                  src={team.logo || defaultImgTeam}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImgTeam;
                  }}
                />
                <Card.Body>
                  <Card.Title>{team.teamName}</Card.Title>
                  <footer>{team.totalPoint || 0} points</footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
        {type === 'player' &&
          users.map((user) => (
            <Col md={2} key={user._id}>
              <Card
                style={{ width: '12rem', margin: '1rem' }}
                className="text-center"
              >
                <Card.Img
                  variant="top"
                  src={user.picture || defaultImgUser}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultImgUser;
                  }}
                />
                <Card.Body>
                  <Card.Title>{user.name}</Card.Title>
                  <footer>{user.coin} coins</footer>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Pagination style={{ justifyContent: 'center' }}>
            <Pagination.First onClick={() => setPage(1)} />
            <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
            {[...new Array(pages).keys()].map((p) => (
              <Pagination.Item
                key={p}
                active={p + 1 === page ? true : false}
                onClick={() => setPage(p + 1)}
              >
                {p + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next
              onClick={() => setPage(page < pages ? page + 1 : pages)}
            />
            <Pagination.Last onClick={() => setPage(pages)} />
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}
