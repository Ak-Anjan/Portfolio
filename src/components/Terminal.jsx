import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'


const COMMANDS = [
  'help',
  'about',
  'skills',
  'projects',
  'experience',
  'certifications',
  'contact',
  'resume',
  'clear',
  'logout',
]


function Terminal() {

  const [command, setCommand] = useState('')

  const [history, setHistory] = useState([])

  const navigate = useNavigate()

  const inputRef = useRef(null)


  /* =====================================
     AUTO SCROLL TO NEXT COMMAND
     ===================================== */

  useEffect(() => {

    if (history.length === 0) {
      return
    }

    const timer = setTimeout(() => {

      if (inputRef.current) {

        inputRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        })

        inputRef.current.focus()

      }

    }, 100)

    return () => {
      clearTimeout(timer)
    }

  }, [history])


  /* =====================================
     EXECUTE COMMAND
     ===================================== */

  const executeCommand = (input) => {

    const value =
      input.trim().toLowerCase()

    if (!value) {
      return
    }


    /* =================================
       CLEAR
       ================================= */

    if (value === 'clear') {

      setHistory([])

      setCommand('')

      setTimeout(() => {

        inputRef.current?.focus()

      }, 100)

      return
    }


    let output = ''

    let targetPage = null


    /* =================================
       COMMANDS
       ================================= */

    switch (value) {


      /* ===============================
         HELP
         =============================== */

      case 'help':

        output = `AVAILABLE COMMANDS
────────────────────────

about
skills
projects
experience
certifications
contact
resume
clear
logout

Type a command and press ENTER.`

        break


      /* ===============================
         ABOUT
         =============================== */

      case 'about':

        output =
          'Opening secure about module...'

        targetPage = '/about'

        break


      /* ===============================
         SKILLS
         =============================== */

      case 'skills':

        output =
          'Loading security skill matrix...'

        targetPage = '/skills'

        break


      /* ===============================
         PROJECTS
         =============================== */

      case 'projects':

        output =
          'Loading security projects...'

        targetPage = '/projects'

        break


      /* ===============================
         EXPERIENCE
         =============================== */

      case 'experience':

        output =
          'Loading professional experience...'

        targetPage = '/experience'

        break


      /* ===============================
         CERTIFICATIONS
         =============================== */

      case 'certifications':

        output =
          'Loading security certifications...'

        targetPage =
          '/certifications'

        break


      /* ===============================
         CONTACT
         =============================== */

      case 'contact':

        output =
          'Opening secure communication channel...'

        targetPage = '/contact'

        break


      /* ===============================
         RESUME
         =============================== */

      case 'resume':
  output =
    'Opening professional resume module...'
  targetPage = '/resume'
  break


      /* ===============================
         LOGOUT
         =============================== */

      case 'logout':

        output =
          'Closing secure terminal...'


        sessionStorage.removeItem(
          'terminal_authenticated'
        )


        setHistory((previous) => [

          ...previous,

          {
            command: value,
            output,
          },

        ])


        setCommand('')


        setTimeout(() => {

          window.location.href = '/'

        }, 500)

        return


      /* ===============================
         UNKNOWN COMMAND
         =============================== */

      default:

        output = `Command not found: ${value}

Type "help" to see available commands.`

        break

    }


    /* =================================
       ADD TO HISTORY
       ================================= */

    setHistory((previous) => [

      ...previous,

      {
        command: value,
        output,
      },

    ])


    /* =================================
       CLEAR CURRENT INPUT
       ================================= */

    setCommand('')


    /* =================================
       NAVIGATION
       ================================= */

    if (targetPage) {

      setTimeout(() => {

        navigate(targetPage)

      }, 300)

    }

  }


  /* =====================================
     FORM SUBMIT
     ===================================== */

  const handleSubmit = (event) => {

    event.preventDefault()

    executeCommand(command)

  }


  /* =====================================
     KEYBOARD
     ===================================== */

  const handleKeyDown = (event) => {

  /* =====================================
     TAB AUTOCOMPLETE
     ===================================== */

  if (event.key === 'Tab') {

    event.preventDefault()

    const typed =
      command.trim().toLowerCase()

    if (!typed) {
      return
    }

    const matches =
      COMMANDS.filter((item) =>
        item.toLowerCase().startsWith(typed)
      )

    if (matches.length === 1) {

      setCommand(matches[0])

      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)

      return
    }

    if (matches.length > 1) {

      setCommand(matches[0])

      setTimeout(() => {
        inputRef.current?.focus()
      }, 0)

      return
    }
  }


  /* =====================================
     ESCAPE
     ===================================== */

  if (event.key === 'Escape') {

    setCommand('')

    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)

  }

}


  return (

    <div className="terminal">


      {/* =================================
          TERMINAL HEADER
          ================================= */}

      <div className="terminal-header">

        <span></span>

        <span></span>

        <span></span>

        <label>
          secure-terminal
        </label>

      </div>


      {/* =================================
          TERMINAL BODY
          ================================= */}

      <div className="terminal-body">


        {/* =================================
            INTRO
            ================================= */}

        <div className="terminal-intro">


          {/* WHOAMI */}

          <p>

            <span className="green">
              root@Ak
            </span>

            <span>
              :
            </span>

            <span className="blue">
              ~
            </span>

            <span>
              $ whoami
            </span>

          </p>


          <p className="output">

            Jr_security_engineer

          </p>


          {/* STATUS */}

          <p>

            <span className="green">
              root@Ak
            </span>

            <span>
              :
            </span>

            <span className="blue">
              ~
            </span>

            <span>
              $ status
            </span>

          </p>


          <p className="output">

            [✓] FIREWALL ........ SECURE

            <br />

            [✓] NETWORK ......... MONITORED

            <br />

            [✓] LINUX ........... ACTIVE

          </p>

        </div>


        {/* =================================
            COMMAND HISTORY
            ================================= */}

        {history.map(
          (item, index) => (

            <div
              className="terminal-history"
              key={index}
            >

              {/* COMMAND */}

              <p>

                <span className="green">
                  root@Ak
                </span>

                <span>
                  :
                </span>

                <span className="blue">
                  ~
                </span>

                <span>
                  $ {item.command}
                </span>

              </p>


              {/* OUTPUT */}

              <pre className="output command-output">
                {item.output}
              </pre>

            </div>

          )
        )}


        {/* =================================
            NEXT COMMAND
            ================================= */}

        <form
          onSubmit={handleSubmit}
        >

          <span className="green">
            root@Ak
          </span>

          <span>
            :
          </span>

          <span className="blue">
            ~
          </span>

          <span>
            $&nbsp;
          </span>


          <input
            ref={inputRef}
            className="terminal-input"
            value={command}
            onChange={(event) =>
              setCommand(
                event.target.value
              )
            }
            onKeyDown={handleKeyDown}
            aria-label="Terminal command"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck="false"
            autoFocus
          />

        </form>

      </div>

    </div>

  )

}


export default Terminal