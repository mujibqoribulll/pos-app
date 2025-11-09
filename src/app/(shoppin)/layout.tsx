'use client';
import Navbar from '@/components/navbar';
import Sidebar from '@/components/sidebar';
import { useAppDispatch } from '@/store/hooks';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { postLogoutThunk } from '../auth/login/store/authThunk';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMinimize, setIsMinimize] = useState(false);
  const dispatch = useAppDispatch();

  const route = useRouter();
  const handleMinimize = () => {
    setIsMinimize((prevState) => !prevState);
  };

  const handleLogout = async () => {
    let result = await dispatch(postLogoutThunk());

    if (postLogoutThunk.fulfilled.match(result)) {
      route.push('/auth/login');
    }
  };

  return (
    <div className="flex flex-row justify-start">
      <div className="">
        <Sidebar
          onPress={handleMinimize}
          isMinimize={isMinimize}
          onPressLogout={handleLogout}
        />
      </div>

      <div className="flex flex-1 h-screen overflow-auto flex-col">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
