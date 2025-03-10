import React from 'react'

function Footer() {
  return (
    <footer className="w-full text-center py-3 text-sm text-[#BBBBBB] bg-[#1B1B1B] border-t border-[#BB86FC]">
      <p>
        Built with 💜 by{" "}
        <a
          href="https://github.com/ALIA-HAIDER"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#BB86FC] hover:text-[#D84040] transition-all duration-300"
        >
          @ALIA-HAIDER
        </a>{" "}
        | Powered by caffeine ☕
      </p>
    </footer>
  )
}

export default Footer