'use client';

import { Button } from '@/components/atoms/Button';
import Header from '@/components/atoms/Header';
import { KeywordInputRef } from '@/components/atoms/Inputs';
import SelectBranch from '@/components/templates/createKeyword/ticket/SelectBranch';
import { useTicket } from '@/contexts/TicketContext';
import { Branch } from '@/data/bank';
import { ticketKeyword } from '@/data/ticket';
import { useRouter } from 'next/navigation';
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from 'react';

export default function EditTicketKeywordPage() {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
  const { setSelectedBranch, setKeywordName, keywordName, selectedBranch } =
    useTicket();
  const [branch, setBranch] = useState<Branch | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  useEffect(() => {
    setBranch(ticketKeyword[0].branch);
    setKeyword(ticketKeyword[0].keyword);
    setSelectedBranch(ticketKeyword[0].branch);
    setKeywordName(ticketKeyword[0].keyword);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetBranch = (branch: Branch) => {
    setSelectedBranch(branch);
    // router.push('/keyword/create/ticket/step3');
  };
  const keywordNameRef = useRef<HTMLInputElement>(null);
  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setKeywordName(e.target.value);
      if (e.target.value === keyword) {
        setIsButtonDisabled(true);
      } else {
        setIsButtonDisabled(false);
      }
    },
    [setKeywordName, keyword]
  );

  const onComplete = useCallback(() => {
    const updatedFormData = {
      branch: selectedBranch,
      keywordName: keywordName,
    };
    console.log('Sending data to server:', updatedFormData);
    router.back();
  }, [keywordName, selectedBranch, router]);

  const isBtnDisabled = useMemo(() => {
    const isDataChanged =
      selectedBranch?.branchId !== branch?.branchId || keywordName !== keyword;
    const isValid =
      !!selectedBranch?.branchId && (keywordName?.length ?? 0 > 0);

		return !(isDataChanged && isValid)
  }, [selectedBranch, keywordName, branch, keyword]);

  return (
    <>
      <Header text='키워드 수정하기' showActionButton={false} />
      <div className='p-4 flex flex-col gap-6'>
        <div>
          <div className='flex flex-col'>
            <strong>키워드명</strong>
            <KeywordInputRef
              className='text-hanaPrimary w-full'
              placeHolder={keywordName || '키워드를 입력하세요'}
              onChange={handleInputChange}
              defaultValue={keywordName || ''}
              ref={keywordNameRef}
            />
          </div>
        </div>
        <div>
          <div className='text-2xl font-semibold flex'>
            <p>현재 영업점: </p>
            <p className='font-bold'>&nbsp;{selectedBranch?.branchName}</p>{' '}
          </div>
          <SelectBranch handleSetBranch={handleSetBranch} />
        </div>
        <Button
          onClick={onComplete}
          className='w-full'
          isDisabled={isBtnDisabled}
        >
          완료
        </Button>
      </div>
    </>
  );
}
