const Avatar = ({ name, src, size = 32 }) => {

  const initials = name
    ?.split(" ")
    .map(word => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }

  return (
    <div
      className="flex items-center justify-center rounded-full bg-black text-white font-bold"
      style={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {initials}
    </div>
  )
}

export default Avatar