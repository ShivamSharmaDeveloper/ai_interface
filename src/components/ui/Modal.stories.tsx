import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import Modal from './Modal';
import Button from './Button';

const meta: Meta<typeof Modal> = {
  title: 'UI/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    closeOnEsc: { control: 'boolean' },
    closeOnOutsideClick: { control: 'boolean' },
  },
};

export default meta;

// We need to use a wrapper component for interactive stories
const ModalDemo = (args: React.ComponentProps<typeof Modal>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Example Modal',
    children: (
      <div>
        <p className="mb-4">This is an example modal dialog. You can put any content here.</p>
        <p>Modal dialogs are useful for displaying additional information or getting user input without navigating away from the current page.</p>
      </div>
    ),
    size: 'md',
  },
};

export const WithFooter: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Modal with Footer',
    children: (
      <div>
        <p>This modal includes footer buttons for common actions.</p>
      </div>
    ),
    footer: (
      <div className="flex justify-end space-x-2">
        <Button variant="outline">Cancel</Button>
        <Button>Save Changes</Button>
      </div>
    ),
    size: 'md',
  },
};

export const Large: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Large Modal',
    children: (
      <div>
        <p className="mb-4">This is a large modal dialog with more content.</p>
        <p className="mb-4">It's useful for displaying more complex information or forms.</p>
        <p className="mb-4">The modal size can be adjusted based on the content requirements.</p>
        <p>You can choose from sm, md, lg, or xl sizes.</p>
      </div>
    ),
    size: 'lg',
  },
};

export const Small: Story = {
  render: (args) => <ModalDemo {...args} />,
  args: {
    title: 'Small Modal',
    children: (
      <div>
        <p>A compact modal for simple messages or quick actions.</p>
      </div>
    ),
    size: 'sm',
  },
};