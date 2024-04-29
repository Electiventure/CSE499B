import React, { useState } from 'react';
import { Card, Dropdown, Button } from 'react-bootstrap';

const CardSection = () => {
    const [showSecondCard, setShowSecondCard] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setShowSecondCard(true);
    };

    const handleSecondOptionSelect = (option) => {
        // Handle the second option selection
    };

    const handleProceed = () => {
        // Handle the proceed action
    };

    const handleCancel = () => {
        // Handle the cancel action
    };

    return (
        <div id="card">
            <h2>Card Section</h2>
            <Card>
                <Card.Body>
                    <Card.Title>First Card</Card.Title>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary">
                            Select Option
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleOptionSelect('Option 1')}>
                                Option 1
                            </Dropdown.Item>
                            <Dropdown.Item onClick={() => handleOptionSelect('Option 2')}>
                                Option 2
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Card.Body>
            </Card>

            {showSecondCard && (
                <Card>
                    <Card.Body>
                        <Card.Title>Second Card</Card.Title>
                        <Dropdown>
                            <Dropdown.Toggle variant="primary">
                                Select Option
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleSecondOptionSelect('Option A')}>
                                    Option A
                                </Dropdown.Item>
                                <Dropdown.Item onClick={() => handleSecondOptionSelect('Option B')}>
                                    Option B
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="success" onClick={handleProceed}>Proceed</Button>{' '}
                        <Button variant="danger" onClick={handleCancel}>Cancel</Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

export default CardSection;
