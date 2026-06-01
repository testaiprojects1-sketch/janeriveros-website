import React from 'react';
import { LanguageProvider } from '../context/LanguageContext';
import { Nav } from './Nav';
import { Hero } from './Hero';
import { SystemArchitecture } from './SystemArchitecture';
import { LiveBuilds } from './LiveBuilds';
import { MavisCapabilities } from './MavisCapabilities';
import { OperatingFlow } from './OperatingFlow';
import { CinematicBand } from './CinematicBand';
import { BeforeAgents } from './BeforeAgents';
import { Journey } from './Journey';
import { Principles } from './Principles';
import { BuildingInPublic } from './BuildingInPublic';
import { Closing } from './Closing';
import { Footer } from './Footer';

// Single React island. The whole site is interactive (language context, scroll
// reveals, the autonomy dial), so it hydrates as one tree via `client:only` in
// index.astro. Splitting into per-section islands would fragment the shared
// LanguageContext — keep it as one root unless you refactor the context to a
// store (e.g. nanostores) shared across islands.
export default function App() {
  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <SystemArchitecture />
        <LiveBuilds />
        <MavisCapabilities />
        <OperatingFlow />
        <CinematicBand variant="boardroom" />
        <BeforeAgents />
        <Journey />
        <Principles />
        <BuildingInPublic />
        <CinematicBand variant="archive" />
        <Closing />
      </main>
      <Footer />
    </LanguageProvider>
  );
}
