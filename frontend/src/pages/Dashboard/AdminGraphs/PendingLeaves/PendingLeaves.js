import React from 'react';import Card from 'react-bootstrap/Card'
import '../AdminGraph.css';import { pending } from '../../../../assets/assets';

function PendingLeaves() {
    return (
        <div>
          <div style={{display: 'flex'}}>
              <Card className='adminCard' border="primary" style={{background:'linear-gradient(to left, #fbb040, #f9ed32)'}}>
                <Card.Body>
                  <Card.Title>Pending Leave Requests</Card.Title>
                  <Card.Subtitle className='adminCardSub'>{pending}2</Card.Subtitle>
                </Card.Body>
              </Card>
          </div>
        </div>
      );
}

export default PendingLeaves
