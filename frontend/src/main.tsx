import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import router from './router.tsx';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { loadTokenFromStorage } from './store/auth/authSlice.ts';

store.dispatch(loadTokenFromStorage());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
