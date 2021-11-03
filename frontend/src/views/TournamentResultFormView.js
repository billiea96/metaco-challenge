import { React, useEffect, useState } from 'react';
import { Col, Container, Form, Row, Button } from 'react-bootstrap';

export default function TournamentResultFormView() {
  const [tournamenList, setTournamentList] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [team, setTeam] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (setTournamentList.length === 0) {
    }
    if (tournament) {
    }
  }, [tournament]);
  return (
    <Container style={{ marginTop: '1rem' }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="tournament">
              <Form.Label>Tournament</Form.Label>
              <Form.Select
                aria-label="Select Tournament"
                name="tournament"
                onChange={(e) => setTournament(e.target.value)}
              >
                <option>-- Select Tournament --</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="team">
              <Form.Label>Team</Form.Label>
              <Form.Select
                aria-label="Select Team"
                name="team"
                onChange={(e) => setTeam(e.target.value)}
              >
                <option>-- Select Team --</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="position">
              <Form.Label>Position</Form.Label>
              <Form.Select
                aria-label="Select Position"
                name="position"
                onChange={(e) => setPosition(e.target.value)}
              >
                <option>-- Select Position --</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
