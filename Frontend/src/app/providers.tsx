'use client'

import { Provider } from 'react-redux'
import { store } from '@/Redux/store'
import { NFTProvider } from '@/Wallet/contracts/NFTContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <NFTProvider>
      <Provider store={store}>
        {children}
        <ToastContainer position="top-center" autoClose={5000} />
      </Provider>
    </NFTProvider>
  )
}
