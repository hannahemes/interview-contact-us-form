import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import Form from './Form';

it("Should have header text Contact Us Form", () => {
    render(<Form />);
    // Test form header text here
    const header = screen.getByText("Contact Us Form");
    expect(header).toHaveTextContent("Contact Us Form");
});

it("Should have button enabled", () => {
    render(<Form/>);
    // Test status of button here
    const button = screen.getByRole('button');
    expect(button).toBeEnabled();
});

it('Should show text alert message', async () => {
    render(<Form />);
    // Extract button node 
    const button = screen.getByRole('button');
    // click button
    userEvent.click(button);
    // Wait for the alert message to appear
    const alert = await screen.findByRole('alert');
    // Assert alert message exists in the DOM
    expect(alert).toBeInTheDocument();
});
