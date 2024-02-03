import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

import { getSession } from "@auth0/nextjs-auth0";
import { motion, useReducedMotion } from "framer-motion";

import { ChevronRight } from "@styled-icons/entypo/ChevronRight";
import { Video } from "@styled-icons/fa-solid/Video";

const ModalVideo = dynamic(() => import("react-modal-video"), {
  ssr: false,
});

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const shouldReduceMotion = useReducedMotion();
  const container = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    show: { opacity: 1 },
  };

  const fadeInRight = {
    hidden: {
      x: shouldReduceMotion ? 0 : 60,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const fadeInLeft = {
    hidden: {
      x: shouldReduceMotion ? 0 : -60,
      opacity: shouldReduceMotion ? 1 : 0,
    },
    show: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.header
        className="header"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="header__text-box">
          <motion.h1 className="heading-primary">
            <motion.span variants={item} className="heading-primary--main">
              Unlimited Space. 
            </motion.span>
            <motion.span variants={item} className="heading-primary--sub">
              A diary for yourself, your peoples, and your places.
            </motion.span>
          </motion.h1>
          <motion.div className="header__btns" variants={fadeInLeft}>
            <a href="/api/auth/login" className="btn-main">
              <span style={{ marginRight: "1.5rem" }}>START NOW</span>
              <ChevronRight size={32} className="icon-chevron" />
            </a>
            
          </motion.div>
          <motion.p className="maker" variants={fadeInLeft}>
            Made with friendship and love by Squirrel Squad
          </motion.p>
        </motion.div>
        <motion.div className="header__img" variants={fadeInRight}>
          <Image
            src="/img/header.png"
            alt="illustration"
            width="450"
            height="450"
          />
        </motion.div>
      </motion.header>
      
    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const { req, res } = context;
  const session = getSession(req, res);

  if (session?.user) {
    return {
      redirect: {
        destination: "/feed/self",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
