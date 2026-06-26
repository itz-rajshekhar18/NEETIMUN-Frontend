"use client";

import { CommitteeCard } from "@/components/sections/committees/CommitteeCard";
import { Container } from "@/components/ui/Container";
import { CardGrid, CardReveal, Parallax, Magnetic } from "@/components/ui/motion";
import { CommitteeSpotlight } from "@/components/sections/committees/CommitteeSpotlight";
import { committees } from "@/lib/data/committees";

export function CommitteeGrid() {
  return (
    <section className="pb-28">
      <CommitteeSpotlight>
        <Container as={CardGrid} className="flex flex-col gap-20">
          {committees.map((committee) => (
            <CardReveal key={committee.id} className="w-full">
              <Parallax range={2} className="w-full">
                <Magnetic range={1} className="w-full">
                  <CommitteeCard
                    tag={committee.tag}
                    title={committee.title}
                    description={committee.description}
                    icon={committee.icon}
                    badges={committee.badges}
                    agenda={committee.agenda}
                    portfolioTypes={committee.portfolioTypes}
                    href={committee.href}
                  />
                </Magnetic>
              </Parallax>
            </CardReveal>
          ))}
        </Container>
      </CommitteeSpotlight>
    </section>
  );
}
