import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Preview = ({ image, title, description }) => {
  return (
    <Card className= 'card' >
      <Card.Img variant="top" src={image}  className='podcast-card-image' />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Read More</Button>
      </Card.Body>
    </Card>
  );
};
