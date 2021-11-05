import { React, useEffect, useState } from 'react';
import {
  Col,
  Container,
  Form,
  Row,
  Button,
  Spinner,
  Alert,
} from 'react-bootstrap';
import Axios from 'axios';

export default function TournamentResultFormView() {
  const [tournamentList, setTournamentList] = useState([]);
  const [tournament, setTournament] = useState(null);
  const [teamList, setTeamList] = useState([]);
  const [team, setTeam] = useState('');
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (tournamentList.length === 0) {
      Axios.get('/api/tournaments').then(({ data }) => setTournamentList(data));
    }
    if (tournament) {
      Axios.get(`/api/tournaments/teams/${tournament}`).then(({ data }) => {
        setTeamList(data);
        setTeam('');
      });
    }
  }, [tournament]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    if (!tournament || !team || !position) {
      alert('Please fill tournament, team, & position');
    }

    Axios.post('/api/tournament-results', {
      tournamentId: tournament,
      teamId: team,
      position,
    })
      .then((response) => {
        setSuccess(true);
      })
      .catch((error) => {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        setError(message);
      })
      .finally(() => setLoading(false));
  };
  return (
    <Container style={{ marginTop: '1rem' }}>
      <Row className="justify-content-md-center">
        <Col md={6}>
          {success && <Alert variant="success">Submitted!</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="tournament">
              <Form.Label>Tournament</Form.Label>
              <Form.Select
                aria-label="Select Tournament"
                name="tournament"
                onChange={(e) => setTournament(e.target.value)}
              >
                <option>-- Select Tournament --</option>
                {tournamentList.map((value) => (
                  <option value={value.id}>{value.title}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="team">
              <Form.Label>Team</Form.Label>
              <Form.Select
                aria-label="Select Team"
                name="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
              >
                <option>-- Select Team --</option>
                {teamList.map((team) => (
                  <option value={team.id}>{team.name}</option>
                ))}
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
                {[...new Array(teamList.length).keys()].map((value) => (
                  <option value={value + 1}>{value + 1}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="success" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{' '}
                  Loading...
                </>
              ) : (
                'Submit'
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
