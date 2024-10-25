import { Button } from '@/components/atoms/Button';
import { Member } from '@/data/member';
import { useRouter } from 'next/navigation';

export default function SettlementCompletion({
  members,
  money,
  accountName,
  isAdjustment,
}: {
  members: Member[];
  money: string;
  accountName: string;
  isAdjustment: boolean;
}) {
  const router = useRouter();

  const handleSubmit = () => {
    console.log('데이터 제출됨', members, money);
    router.push('/');
  };

  return (
    <div className='flex flex-col gap-[30px] pt-[30px] h-full'>
      <p className='text-[24px] font-semibold text-center'>
        {isAdjustment ? '정산' : '회비'} 요청이 완료되었어요
      </p>

      <div className='flex flex-col items-center justify-center gap-[11px] flex-grow'>
        <p className='text-[18px] font-normal'>{accountName}로</p>
        <div className='text-[#069894] text-[24px] font-semibold flex-grow'>
          {members.map((member, idx) =>
            idx !== members.length - 1 ? (
              <span key={member.id} className='mr-[3px]'>
                {member.name},
              </span>
            ) : (
              <span key={member.id}>{member.name}</span>
            )
          )}
          <span className='text-black ml-[3px]'>님에게</span>
          <p className='text-[18px] text-center'>{money} 원이 요청됐어요</p>
        </div>
      </div>

      <Button className='w-full mb-[34px]' onClick={handleSubmit}>
        완료
      </Button>
    </div>
  );
}
