import { NextPage } from 'next'
import Head from 'next/head'
import css from "./layout.module.css";
import React from 'react'
interface LayoutProps {
    title: string;
}
export const Layout: NextPage<LayoutProps> = ({ title, children }) => {
    return (
        <>
            <Head>
                <title>Github Jobs | {title}</title>
            </Head>
            <div className={css.container}>
                <header className={css.header}>
                    <h1>
                        <span className={css["header-brand"]}>Github</span> Jobs
                    </h1>
                </header>
                <main className={css.main}>{children}</main>
                <footer className={css.footer}>Oliver @DevChallenges.io</footer>
            </div>

        </>
    )
}
