'use client';

import Header from '@/components/atoms/Header';
import {
  AccountInputRef,
  DefaultInputRef,
  SearchInpuRef,
  AccountRefProps,
  MoneyInputRef,
  KeywordInputRef,
} from '@/components/atoms/Inputs';
import UserCheckBox from '@/components/atoms/UserCheckBox';
import { Button } from '@/components/atoms/button';
import CheckBox from '@/components/atoms/checkBox';
import { Chip } from '@/components/atoms/chips';
import ColorChip from '@/components/atoms/color_chips';
import { MicRef } from '@/components/atoms/mic';
import { Modal } from '@/components/atoms/modal';
import { useEffect, useRef, useState } from 'react';

export default function CompsTestPage() {
  const AccoutRef = useRef<AccountRefProps>(null);
  const MoneyRef = useRef<HTMLInputElement>(null);
  const micRef = useRef<HTMLDivElement>(null);
  const [isopen, setIsopen] = useState(true);
  const closeModal = () => {
    setIsopen(!isopen);
  };

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [userChecked, setUserChecked] = useState<boolean>(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      console.log(AccoutRef.current?.bankId);
      console.log(AccoutRef.current?.inputRef.current?.value);
      console.log(Number(MoneyRef.current?.value.replace(/[^0-9]/g, '')));
    }, 1000);
    return () => {
      clearInterval(intervalId);
      console.log('인터벌 정리됨');
    };
  }, []);

  const handleSubmit = () => {
    return;
  };

  // const testHandle = () => {
  //   micRef?.current?.click(); // 마이크 펼치기
  // };

  return (
    <>
      <div>
        <form>
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
          <DefaultInputRef
            name='hi'
            type='email'
            required={true}
            error='error message...'
          />
        </form>
        <SearchInpuRef name='hi' onSubmit={handleSubmit} />
        <AccountInputRef placeHolder='hi' ref={AccoutRef} />

        <MoneyInputRef ref={MoneyRef} placeHolder='얼마를 보낼까요?' />
        <KeywordInputRef placeHolder='키워드 이름을 작성해주세요' />
      </div>
      <hr />
      <div className='flex'>
        <Chip item={{ id: 1, value: '김인선' }} />
      </div>
      <div className='flex'>
        <Chip
          item={{ id: 1, value: '김인선' }}
          canDelete={true}
          onRemove={() => alert('x')}
        />
      </div>
      <Header text={'Test'} />
    </>
  );
}
