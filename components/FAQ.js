"use client";
import * as Accordion from "@radix-ui/react-accordion";
const faqs=[
  {q:"Fully-managed vs Co-managed IT?",a:"Fully-managed: we run helpdesk, monitoring, security end-to-end. Co-managed: we augment your in-house IT."},
  {q:"How fast do you answer?",a:"Every request, by phone or email, is answered by the next business day. Remote sessions are scheduled on weekday afternoons."},
  {q:"Minimum users?",a:"None. SupremeCare SOHO covers 1 to 9 people; SupremeCare covers 10 to 50."},
  {q:"Tooling included?",a:"Yes—EDR/XDR, patching, monitoring, email security, backup/DR."},
  {q:"Contract terms?",a:"Monthly (30-day cancellation) or annual discounts."},
];
export default function FAQ(){
  return (
    <Accordion.Root type="single" collapsible className="w-full">
      {faqs.map((f,i)=>(
        <Accordion.Item key={i} value={`i-${i}`} className="border-b border-white/10">
          <Accordion.Header>
            <Accordion.Trigger className="py-4 w-full text-left font-medium text-slate-100 hover:text-cyan-300">
              {f.q}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="pb-4 text-slate-300">{f.a}</Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
