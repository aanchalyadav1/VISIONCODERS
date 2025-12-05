export default function Card({children,className=''}) {
  return (
    <div className={'p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur ' + className}>
      {children}
    </div>
  );
}