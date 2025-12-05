export default function Button({children,onClick,variant='primary',className=''}) {
  const base='px-4 py-2 rounded transition-all duration-200 font-medium ';
  const styles={
    primary:'bg-blue-600 hover:bg-blue-700 text-white',
    ghost:'bg-white/10 hover:bg-white/20 text-white'
  };
  return (
    <button onClick={onClick} className={base + styles[variant] + ' ' + className}>
      {children}
    </button>
  );
}