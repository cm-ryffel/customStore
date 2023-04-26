import React from 'react'
import styles from "./Footer.module.scss";
import 'animate.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faVk } from '@fortawesome/free-brands-svg-icons'
import { faTelegram } from '@fortawesome/free-brands-svg-icons'


const insta = <FontAwesomeIcon icon={faInstagram} />
const vk = <FontAwesomeIcon icon={faVk} />
const tg = <FontAwesomeIcon icon={faTelegram} />


export default function Footer() {
  return (
    <div>
       <footer className={styles.footer}>
        <div className={`${styles.footerWrapper} align-center`}>
          <div className={styles.NastyWrapper}>
            <div className={`${styles.footerMain} animate__animated animate__pulse animate__infinite`}>Nasty S.Lin</div>
          </div>

          <div className={styles.footerFoot}>
            <div className={styles.footerCopy}>
              &#169; Copyright. All Rirhts Reserved
            </div>

            <div className={`${styles.footerLinks} mt-20 mb-20`}>
              <ul className={styles.linksList}>
                <li className="insta"><a href="#">{insta}</a></li>
                <li className="vk"><a href="#">{vk}</a></li>
                <li className="tg"><a href="#">{tg}</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
