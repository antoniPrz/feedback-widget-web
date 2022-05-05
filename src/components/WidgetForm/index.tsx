import { useState } from 'react';

import { CloseButton } from '../CloseButton';
import { FeedbackTypeStep } from './Steps/FeedbackTypeStep';
import { FeedbackContentStep } from './Steps/FeedbackContentStep';

import bugImageUrl from '../../images/bug.svg';
import ideaImageUrl from '../../images/idea.svg';
import thoughtImageUrl from '../../images/thought.svg';
import { FeedbackSuccessStep } from './Steps/FeedbackSuccessStep';

export const feedbackTypes = {
  BUG: {
    title: 'Problema',
    image: { source: bugImageUrl, alt: 'imagen de un incecto' },
  },
  IDEA: {
    title: 'Ideia',
    image: { source: ideaImageUrl, alt: 'imagen de un bombillo' },
  },
  THOUGHT: {
    title: 'Outro',
    image: { source: thoughtImageUrl, alt: 'imagen de nuve de pensamiento' },
  },
};

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm() {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [feedbackSent, setfeedbackSent] = useState(false);

  function handleRequestFeedback() {
    setFeedbackType(null);
    setfeedbackSent(false);
  }

  return (
    <>
      <div className='bg-zinc-900 p-4 rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto'>
        {feedbackSent ? (
          <FeedbackSuccessStep
            onfeedbackRestartRequested={handleRequestFeedback}
          />
        ) : (
          <>
            {!feedbackType ? (
              <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
              <FeedbackContentStep
                feedbackTypeSelected={feedbackType}
                onfeedbackRestartRequested={handleRequestFeedback}
                onFeedbackSent={() => setfeedbackSent(true)}
              />
            )}
          </>
        )}

        <footer className='text-xs text-neutral-400'>
          Feito com ♥ pela
          <a
            href='https://rocketseat.com.br'
            target='_blank'
            className='underline  underline-offset-2'
          >
            Rocketseat
          </a>
        </footer>
      </div>
    </>
  );
}
