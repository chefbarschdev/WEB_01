/**
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the client when the client is used to render the
 * application.
 *
 * Feel free to use this file to add client-side logic or to modify the root of the application.
 */
import { render } from '@builder.io/qwik';
import Root from './root';

render(document.getElementById('app') as Element, <Root />);