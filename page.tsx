import { ChangeEvent, useEffect, useState } from 'react';

import eventBus from './eventBus';
import { useQueue } from './use-queue';

const SenderComponent = () => {
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setMessage(event.target.value);
  };

  const sendMessage1 = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (message.trim()) {
      eventBus.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div>
      <div>
        <h3>Receiver</h3>
        <input
          type='text'
          value={message}
          onChange={handleInputChange}
          placeholder='Type a message'
        />
        <button onClick={sendMessage1}>Send message</button>
      </div>
    </div>
  );
};

// FIFO example

const ReceiverComponent = () => {
  const MAX_MESSAGES = 3;
  const [receivedMessages, enqueueMessage] = useQueue<string>(MAX_MESSAGES);

  useEffect(() => {
    const handleMessage = (data: string): void => {
      console.log('ReceiverComponent received message:', data);
      enqueueMessage(data);
    };

    eventBus.on('message', handleMessage);

    return () => {
      eventBus.off('message', handleMessage);
    };
  }, [enqueueMessage]);

  return (
    <div>
      <h3>Receiver - Last {MAX_MESSAGES} messages (FIFO)</h3>
      {receivedMessages.length === 0 ? (
        <p>No Messages yet</p>
      ) : (
        <ul>
          {receivedMessages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const AppWithEventBus = () => {
  return (
    <div>
      <h2>EventBus Exapmle</h2>
      <SenderComponent />
      <hr />
      <ReceiverComponent />
      <hr />
    </div>
  );
};
