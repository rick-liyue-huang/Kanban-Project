'use client';

import Image from 'next/image';
import React from 'react';
import { MagnifyingGlassIcon, UserCircleIcon } from '@heroicons/react/20/solid';
import * as Avatar from '@radix-ui/react-avatar';

export default function Header() {
  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-[#8fbc8f] rounded-b-2xl shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-br from-[#8fbc8f] to-green-50 rounded-md filter blur-3xl opacity-70 -z-20" />

        {/* Logo */}
        <Image
          src="/logo.png"
          alt="kanban logo"
          width={300}
          height={100}
          className="w-44 md:w-56 pb-10 md:pb-0 object-contain"
        />

        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Search bar */}
          <form className="flex items-center space-x-5 bg-white rounded-md md:ml-10 p-2 shadow-md flex-1 md:flex-initial w-full">
            <MagnifyingGlassIcon className="w-6 h-6 bg-transparent text-gray-300" />
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 outline-none p-2 w-full"
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          {/* Avatar */}
          <Avatar.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
            <Avatar.Image
              className="h-full w-full rounded-[inherit] object-cover"
              src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&w=128&h=128&dpr=2&q=80"
              alt="Pedro Duarte"
            />
            <Avatar.Fallback
              className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
              delayMs={600}
            >
              JD
            </Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 md:py-5">
        <p className="flex items-center text-sm font-light pr-5 shadow-xl rounded-xl w-fit bg-white italic max-w-3xl text-sky-400 p-6">
          <UserCircleIcon className="inline-block h-10 w-10 text-sky-500 mr-1" />
          tasks will load ...
        </p>
      </div>
    </header>
  );
}
