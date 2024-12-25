import TransactionHistory from '@/components/molecules/Transaction';
import { Transaction } from '@/types/Keyword';
// import { InquiryList } from '@/data/inquiry';
// import { transactionList } from '@/data/transaction';
import Image from 'next/image';
// import { useSearchParams } from 'next/navigation';
import { formatDate } from '@/lib/utils';

// type TransactionListProps = {
//   keyword: string;
// };

type TransactionListProps = {
  tranactions: Transaction[];
};

export default function TransactionList({ tranactions }: TransactionListProps) {
  // const searchParams = useSearchParams();
  // const id = searchParams.get('id');

  // const keywordDetail = InquiryList.find((each) => each.id === Number(id));

  // if (!keywordDetail) {
  //   return (
  //     <div>
  //       <Image
  //         src={'/images/alarts/noData.gif'}
  //         alt=''
  //         width={100}
  //         height={100}
  //         className='mx-auto'
  //       />
  //       <p className='text-center font-bold text-[20px]'>
  //         해당 키워드의 거래내역이 없어요!
  //       </p>
  //       {/* <p className='text-center'>(예)홍길동, 000곗돈 등으로 검색해보세요!</p> */}
  //     </div>
  //   );
  // }

  // description에서 키워드 추출
  // const keyword = keywordDetail.searchKeyword;
  // const keyword = originKeyword?.split('>').pop()?.trim() || '';

  // const keyword = '성수'; //input keyword

  // accountName에 keyword가 포함된 거래 내역만 필터링
  // 필터링된 데이터만 전송하기에 불필요한 데이터 제거
  // const filteredTransactions = tranactions
  //   .filter((transaction) => transaction.alias.includes(keyword))
  //   .sort(
  //     // (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
  //     (a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
  //   );

  // 한글키워드 검색 시, 받침 유무에 따른 을/를 출력
  // const hasBatchim = (word: string) => {
  //   const lastChar = word[word.length - 1];
  //   const code = lastChar.charCodeAt(0);
  //   if (code < 44032 || code > 55203) return false;
  //   return (code - 44032) % 28 !== 0;
  // };
  let lastDate = '';

  return (
    <div className='flex flex-col gap-[24px]'>
      {/* <h1 className='font-bold text-2xl'>
        {keyword}
        {hasBatchim(keyword) ? '을' : '를'} 기반으로
        <br />
        검색한 결과예요
      </h1> */}
      <div className=''>
        <h1 className='text-[18px] font-semibold mb-[16px]'>
          최근 거래내역{' '}
          <span className='text-[12px]'>({tranactions.length}건)</span>
        </h1>
        <div className=''>
          {tranactions.length > 0 ? (
            tranactions.map((data) => {
              const currentDate = formatDate(data.createAt); // 현재 거래의 날짜
              const showDate = lastDate !== currentDate; // 날짜가 달라지면 표시
              lastDate = currentDate; // 마지막 표시된 날짜 업데이트

              return (
                <div key={data.id} className=''>
                  {showDate && (
                    <h2 className='text-[12px] text-subGray'>{currentDate}</h2>
                  )}
                  <TransactionHistory data={data} />
                </div>
              );
            })
          ) : (
            <div className='flex-col flex justify-center'>
              <Image
                src={'/images/alarts/noData.gif'}
                alt=''
                width={150}
                height={150}
                className='mx-auto'
              />
              <p className='text-center font-bold text-[20px]'>
                해당 키워드의 거래내역이 없어요!
              </p>
              <p className='text-center'>
                (예)홍길동, 000곗돈 등으로 검색해보세요!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
