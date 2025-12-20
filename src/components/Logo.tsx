function Logo() {
  return (
    <div className="flex flex-col items-center mb-8">
      {/* Logo Image */}
      <img
        src="/logo.png"
        alt="Logo"
        className="w-60 h-60 sm:w-76 sm:h-80 object-contain ml-10 "
      />
    </div>
  );
}

export default Logo;
