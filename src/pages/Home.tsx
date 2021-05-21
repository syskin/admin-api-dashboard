import React from 'react'
import { entities } from '../config/entities'
const Home: React.FC = () => {
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <a
          href="https://github.com/syskin/admin-api-dashboard"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="56"
            height="56"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginLeft: '1em'
          }}
        >
          <h1 style={{ margin: '0' }}>React Admin API dashboard</h1>
          <p>Manage your API data throught your own API endpoints</p>
        </div>
      </div>

      <div className="responsive-wrapper">
        <div className="responsive-block" style={{ margin: '1em 0' }}>
          <p>
            Your dashboard is requesting{' '}
            <span style={{ fontWeight: 'bold' }}>
              {process.env.REACT_APP_BASE_URL}
            </span>
          </p>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            Authentication is{' '}
            {process.env.REACT_APP_AUTHENTICATION === 'true' ? (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ fontWeight: 'bold' }}>&nbsp;activate</span>
                <div
                  style={{
                    fill: 'green',
                    marginLeft: '4px',
                    paddingTop: '4px'
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 191.667 191.667"
                  >
                    <path
                      d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z
                        M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685
                        c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971
                        l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969
                        C156.146,65.765,156.146,74.362,150.862,79.646z"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <span style={{ fontWeight: 'bold' }}>&nbsp;disable</span>
                <div
                  style={{ fill: 'red', marginLeft: '4px', paddingTop: '4px' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="16"
                    width="16"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M257,0C116.39,0,0,114.39,0,255s116.39,257,257,257s255-116.39,255-257S397.61,0,257,0z M383.22,338.79
			c11.7,11.7,11.7,30.73,0,42.44c-11.61,11.6-30.64,11.79-42.44,0L257,297.42l-85.79,83.82c-11.7,11.7-30.73,11.7-42.44,0
			c-11.7-11.7-11.7-30.73,0-42.44l83.8-83.8l-83.8-83.8c-11.7-11.71-11.7-30.74,0-42.44c11.71-11.7,30.74-11.7,42.44,0L257,212.58
			l83.78-83.82c11.68-11.68,30.71-11.72,42.44,0c11.7,11.7,11.7,30.73,0,42.44l-83.8,83.8L383.22,338.79z"
                    />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="responsive-block" style={{ margin: '1em 0' }}>
          Configured entities :
          <ul style={{ listStyle: 'none', fontSize: '16px' }}>
            {entities.map((entity, index) => {
              return (
                <li
                  style={{ display: 'flex', flexDirection: 'row' }}
                  key={index}
                >
                  <span style={{ fontWeight: 'bold' }}>{entity.name}</span>
                  <div
                    style={{
                      fill: 'green',
                      marginLeft: '4px',
                      paddingTop: '4px'
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="16"
                      width="16"
                      viewBox="0 0 191.667 191.667"
                    >
                      <path
                        d="M95.833,0C42.991,0,0,42.99,0,95.833s42.991,95.834,95.833,95.834s95.833-42.991,95.833-95.834S148.676,0,95.833,0z
                      M150.862,79.646l-60.207,60.207c-2.56,2.56-5.963,3.969-9.583,3.969c-3.62,0-7.023-1.409-9.583-3.969l-30.685-30.685
                      c-2.56-2.56-3.97-5.963-3.97-9.583c0-3.621,1.41-7.024,3.97-9.584c2.559-2.56,5.962-3.97,9.583-3.97c3.62,0,7.024,1.41,9.583,3.971
                      l21.101,21.1l50.623-50.623c2.56-2.56,5.963-3.969,9.583-3.969c3.62,0,7.023,1.409,9.583,3.969
                      C156.146,65.765,156.146,74.362,150.862,79.646z"
                      />
                    </svg>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
