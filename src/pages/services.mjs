import { icon, pageHero } from '../components.mjs';
import { href } from '../util.mjs';

const content = {
  bg: {
    title: 'Услуги',
    description:
      'Административно, финансово и техническо управление на етажна собственост, общи събрания, аварийна линия и онлайн отчет за собствениците.',
    intro:
      'Всичко, което досега вършеше домоуправителят – и още. Обхватът на услугите зависи от избрания план и се описва в договора с етажната собственост.',
    groups: [
      {
        icon: 'doc',
        title: 'Административно управление',
        items: [
          'Водене на книгата на етажната собственост и вписване на промените в собствеността и обитателите',
          'Регистрация на етажната собственост и на промените в управлението в общината',
          'Изготвяне и съхранение на протоколи, решения и договори',
          'Свикване и провеждане на общи събрания, включително покани и дневен ред',
          'Изпълнение на решенията на общото събрание',
        ],
      },
      {
        icon: 'coins',
        title: 'Финансово управление',
        items: [
          'Разпределяне на разходите за управление и поддържане съгласно ЗУЕС и решенията на общото събрание',
          'Събиране на вноските по банков път и в брой срещу документ',
          'Плащане на сметките за общите части – ток, вода, асансьор, почистване',
          'Водене на фонд „Ремонт и обновяване“',
          'Отчет за приходите и разходите – онлайн и пред общото събрание',
          'Напомняния към неизрядни платци и съдействие при събиране на задължения',
        ],
      },
      {
        icon: 'wrench',
        title: 'Техническо поддържане',
        items: [
          'Редовни огледи на общите части',
          'Организиране на почистване, дезинсекция и дератизация',
          'Договор с регистрирана фирма за поддръжка на асансьора и контрол на прегледите',
          'Ремонти – събиране на поне три оферти, контрол на изпълнението и приемане на работата',
          'Подмяна на осветление, ключове, брави и дребни ремонти',
        ],
      },
      {
        icon: 'chat',
        title: 'Комуникация със собствениците',
        items: [
          'Онлайн профил за всеки собственик с отчети, документи и съобщения',
          'Съобщения по имейл и на таблото във входа',
          'Приемане и проследяване на сигнали',
          'Един отговорен мениджър за вашата сграда',
        ],
      },
      {
        icon: 'phone',
        title: 'Аварийна линия 24/7',
        items: [
          'Денонощно приемане на сигнали за течове, токови аварии и заседнал асансьор',
          'Изпращане на аварийна фирма и информиране на засегнатите собственици',
        ],
      },
      {
        icon: 'shield',
        title: 'Сигурност и прозрачност',
        items: [
          'Средствата на етажната собственост се водят отделно от средствата на дружеството',
          'Всеки разход е подкрепен с документ, достъпен за собствениците',
          'Лични данни, обработвани съгласно ОРЗД',
        ],
      },
    ],
    cta: 'Вижте какво включва всеки план',
  },
  en: {
    title: 'Services',
    description:
      'Administrative, financial and technical management of condominiums, owners’ meetings, an emergency line and online reports for owners.',
    intro:
      'Everything your house manager used to do – and more. The exact scope depends on the chosen plan and is set out in the contract with the condominium.',
    groups: [
      {
        icon: 'doc',
        title: 'Administrative management',
        items: [
          'Keeping the condominium register and recording changes of owners and occupants',
          'Registering the condominium and changes in its management with the municipality',
          'Preparing and storing minutes, decisions and contracts',
          'Convening and running general meetings, including notices and agendas',
          'Carrying out the decisions of the general meeting',
        ],
      },
      {
        icon: 'coins',
        title: 'Financial management',
        items: [
          'Allocating management and maintenance costs under the Act and the general meeting’s decisions',
          'Collecting contributions by bank transfer and in cash against a receipt',
          'Paying common-area bills – electricity, water, lift, cleaning',
          'Managing the repair and renovation fund',
          'Income and expense reports – online and at the general meeting',
          'Reminders to late payers and help with recovering arrears',
        ],
      },
      {
        icon: 'wrench',
        title: 'Technical maintenance',
        items: [
          'Regular inspections of the common areas',
          'Arranging cleaning, pest control and rodent control',
          'A contract with a registered lift-maintenance company and oversight of inspections',
          'Repairs – at least three quotes, supervision of the work and acceptance',
          'Replacing lighting, switches, locks and minor repairs',
        ],
      },
      {
        icon: 'chat',
        title: 'Communication with owners',
        items: [
          'An online account for each owner with reports, documents and notices',
          'Notices by e-mail and on the building’s notice board',
          'Logging and tracking reported issues',
          'One dedicated manager for your building',
        ],
      },
      {
        icon: 'phone',
        title: '24/7 emergency line',
        items: [
          'Round-the-clock reporting of leaks, power failures and stuck lifts',
          'Dispatching an emergency contractor and informing the affected owners',
        ],
      },
      {
        icon: 'shield',
        title: 'Security and transparency',
        items: [
          'The condominium’s funds are kept separate from the company’s own funds',
          'Every expense is backed by a document that owners can see',
          'Personal data processed in line with the GDPR',
        ],
      },
    ],
    cta: 'See what each plan includes',
  },
};

function render(lang) {
  const c = content[lang];
  return {
    title: c.title,
    description: c.description,
    body: `${pageHero(c.title, c.intro)}
      <section class="section" aria-label="${c.title}">
        <div class="container">
          <div class="service-grid">
            ${c.groups
              .map(
                (g) => `<section class="card" aria-labelledby="svc-${g.icon}">
              ${icon(g.icon, 'icon icon-large')}
              <h2 id="svc-${g.icon}" class="card-title">${g.title}</h2>
              <ul class="check-list">${g.items.map((i) => `<li>${i}</li>`).join('')}</ul>
            </section>`,
              )
              .join('')}
          </div>
          <p class="center"><a class="button button-large" href="${href(lang, 'pricing')}">${c.cta}</a></p>
        </div>
      </section>`,
  };
}

export default { key: 'services', render };
