import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'

export function Footer() {
  return (
    <footer className="mt-12 bg-neutral-900 py-6 text-gray-400">
      <div className="container mx-auto flex flex-col items-center gap-2">
        <p className="text-sm">
          Developed by <span className="font-semibold text-white">Gustavo Bento de Paula</span>
        </p>
        <div className="flex gap-4">
          <a
            href="https://github.com/gustavobpaula"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/gustavo-bento-de-paula/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="https://www.instagram.com/gustavobpaula/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            <FaInstagram size={20} />
          </a>
        </div>
      </div>
    </footer>
  )
}
