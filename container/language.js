(function () {
  "use strict";

  const STORAGE_KEY = "monthly-colors-language";
  const STORAGE_SCHEMA_KEY = "monthly-colors-language-schema";
  const STORAGE_SCHEMA_VERSION = "local-months-v1";
  const SUPPORTED_LANGUAGES = ["pt-BR", "en", "fr", "es"];
  const scriptUrl = new URL(document.currentScript.src, window.location.href);
  const isMonthPage = Boolean(document.body?.dataset.monthPage);

  const assetUrl = (filename) => new URL(`../assets/${filename}`, scriptUrl).href;

  const languageInfo = {
    "pt-BR": {
      label: "Português",
      flag: assetUrl("brazilico.png"),
      flagAlt: "Bandeira do Brasil",
    },
    en: {
      label: "English",
      flag: assetUrl("bandeira-estados-unidos.png"),
      flagAlt: "United States flag",
    },
    fr: {
      label: "Français",
      flag: assetUrl("frança.png"),
      flagAlt: "Drapeau de la France",
    },
    es: {
      label: "Español",
      flag: assetUrl("espanha.png"),
      flagAlt: "Bandera de España",
    },
  };

  const translations = {
    "pt-BR": {
      "common.loading": "Carregando...",
      "language.select": "Selecionar idioma",
      "nav.about": "Sobre nós",
      "nav.goMonths": "Ir para a seção de meses",
      "season.summer": "Verão",
      "season.autumn": "Outono",
      "season.winter": "Inverno",
      "season.spring": "Primavera",
      "home.eyebrow": "O que é o Monthly Colors",
      "home.title": "Cada mês tem uma cor,<br>uma história e um motivo<br>pra celebrar.",
      "home.description": "O calendário reúne muito mais do que números e feriados. Ao longo do ano, cada mês carrega cores, símbolos, campanhas, acontecimentos e tradições que fazem parte do cotidiano, mas cujos significados nem sempre são conhecidos. Nesta página, essas informações são organizadas de maneira visual para explicar de onde surgem essas associações, por que determinados temas ganham destaque em cada período e como elementos culturais e naturais ajudam a construir a identidade de cada mês. Basta escolher uma das opções abaixo para iniciar a exploração e conhecer, de forma clara e agradável, os detalhes que tornam cada etapa do ano única.",
      "home.colorsTitle": "Cores & Campanhas",
      "home.colorsText": "A cor e o significado por trás de cada campanha de conscientização do mês.",
      "home.datesTitle": "Datas Importantes",
      "home.datesText": "Feriados, dias comemorativos e eventos pra você nunca mais esquecer.",
      "home.moonTitle": "Fases da Lua",
      "home.moonText": "Quando a lua estará cheia, nova, crescente ou minguante em cada mês.",
      "home.browseMonths": "Navegue pelos meses",
      "about.pageTitle": "Sobre nós — Monthly Colors",
      "about.photoAlt": "Tamires e Lucas",
      "about.sectionLabel": "Sobre nós",
      "about.title": "Duas ideias,<br>um projeto <em>cheio de cor.</em>",
      "about.description": "Somos <strong>Tamires</strong> e <strong>Lucas</strong>, estudantes do curso técnico em Desenvolvimento de Sistemas, em Campinas. Criamos o <strong>Monthly Colors</strong> como projeto de TCC para reunir, de forma clara e visual, as cores, campanhas e significados presentes em cada mês do ano.<br><br>Unimos pesquisa, design e programação para transformar informação em uma experiência mais simples, interessante e fácil de explorar. Para nós, tecnologia também é uma maneira de comunicar ideias, despertar curiosidade e criar algo que tenha identidade.",
      "about.educationLabel": "Formação",
      "about.educationText": "Desenvolvimento de Sistemas",
      "about.projectLabel": "Projeto",
      "about.cityLabel": "Cidade",
      "footer.project": "Projeto TCC 2026 - Desenvolvido por Lucas Cruz e Tamires Alves - Monthly Colors",
      "month.january": "Janeiro",
      "month.february": "Fevereiro",
      "month.march": "Março",
      "month.april": "Abril",
      "month.may": "Maio",
      "month.june": "Junho",
      "month.july": "Julho",
      "month.august": "Agosto",
      "month.september": "Setembro",
      "month.october": "Outubro",
      "month.november": "Novembro",
      "month.december": "Dezembro",
      "month.january.short": "Jan",
      "month.february.short": "Fev",
      "month.march.short": "Mar",
      "month.april.short": "Abr",
      "month.may.short": "Mai",
      "month.june.short": "Jun",
      "month.july.short": "Jul",
      "month.august.short": "Ago",
      "month.september.short": "Set",
      "month.october.short": "Out",
      "month.november.short": "Nov",
      "month.december.short": "Dez",
    },
    en: {
      "common.loading": "Loading...",
      "language.select": "Select language",
      "nav.about": "About us",
      "nav.goMonths": "Go to the months section",
      "season.summer": "Summer",
      "season.autumn": "Autumn",
      "season.winter": "Winter",
      "season.spring": "Spring",
      "home.eyebrow": "What is Monthly Colors?",
      "home.title": "Every month has a color,<br>a story and a reason<br>to celebrate.",
      "home.description": "The calendar brings together much more than numbers and holidays. Throughout the year, each month carries colors, symbols, campaigns, events and traditions that are part of everyday life, although their meanings are not always widely known. On this page, that information is organized visually to explain where these associations come from, why certain themes gain prominence during each period, and how cultural and natural elements help shape each month’s identity. Simply choose one of the options below to begin exploring and discover, clearly and enjoyably, the details that make every stage of the year unique.",
      "home.colorsTitle": "Colors & Campaigns",
      "home.colorsText": "The color and meaning behind each awareness campaign of the month.",
      "home.datesTitle": "Important Dates",
      "home.datesText": "Holidays, commemorative dates and events you will never forget again.",
      "home.moonTitle": "Moon Phases",
      "home.moonText": "Find out when the moon will be full, new, waxing or waning each month.",
      "home.browseMonths": "Browse the months",
      "about.pageTitle": "About us — Monthly Colors",
      "about.photoAlt": "Tamires and Lucas",
      "about.sectionLabel": "About us",
      "about.title": "Two ideas,<br>one project <em>full of color.</em>",
      "about.description": "We are <strong>Tamires</strong> and <strong>Lucas</strong>, students in the Systems Development technical program in Campinas. We created <strong>Monthly Colors</strong> as our final course project to bring together, clearly and visually, the colors, campaigns and meanings present in each month of the year.<br><br>We combine research, design and programming to transform information into a simpler, engaging and easy-to-explore experience. For us, technology is also a way to communicate ideas, spark curiosity and create something with its own identity.",
      "about.educationLabel": "Education",
      "about.educationText": "Systems Development",
      "about.projectLabel": "Project",
      "about.cityLabel": "City",
      "footer.project": "2026 Final Project - Developed by Lucas Cruz and Tamires Alves - Monthly Colors",
      "month.january": "January",
      "month.february": "February",
      "month.march": "March",
      "month.april": "April",
      "month.may": "May",
      "month.june": "June",
      "month.july": "July",
      "month.august": "August",
      "month.september": "September",
      "month.october": "October",
      "month.november": "November",
      "month.december": "December",
      "month.january.short": "Jan",
      "month.february.short": "Feb",
      "month.march.short": "Mar",
      "month.april.short": "Apr",
      "month.may.short": "May",
      "month.june.short": "Jun",
      "month.july.short": "Jul",
      "month.august.short": "Aug",
      "month.september.short": "Sep",
      "month.october.short": "Oct",
      "month.november.short": "Nov",
      "month.december.short": "Dec",
    },
    fr: {
      "common.loading": "Chargement...",
      "language.select": "Sélectionner la langue",
      "nav.about": "À propos de nous",
      "nav.goMonths": "Aller à la section des mois",
      "season.summer": "Été",
      "season.autumn": "Automne",
      "season.winter": "Hiver",
      "season.spring": "Printemps",
      "home.eyebrow": "Qu’est-ce que Monthly Colors ?",
      "home.title": "Chaque mois a une couleur,<br>une histoire et une raison<br>de célébrer.",
      "home.description": "Le calendrier réunit bien plus que des chiffres et des jours fériés. Tout au long de l’année, chaque mois porte des couleurs, des symboles, des campagnes, des événements et des traditions qui font partie du quotidien, mais dont la signification n’est pas toujours connue. Sur cette page, ces informations sont organisées visuellement afin d’expliquer l’origine de ces associations, pourquoi certains thèmes prennent de l’importance à chaque période et comment les éléments culturels et naturels contribuent à construire l’identité de chaque mois. Il suffit de choisir l’une des options ci-dessous pour commencer l’exploration et découvrir, de manière claire et agréable, les détails qui rendent chaque étape de l’année unique.",
      "home.colorsTitle": "Couleurs et campagnes",
      "home.colorsText": "La couleur et la signification de chaque campagne de sensibilisation du mois.",
      "home.datesTitle": "Dates importantes",
      "home.datesText": "Jours fériés, dates commémoratives et événements à ne plus jamais oublier.",
      "home.moonTitle": "Phases de la Lune",
      "home.moonText": "Découvrez quand la Lune sera pleine, nouvelle, croissante ou décroissante chaque mois.",
      "home.browseMonths": "Parcourir les mois",
      "about.pageTitle": "À propos de nous — Monthly Colors",
      "about.photoAlt": "Tamires et Lucas",
      "about.sectionLabel": "À propos de nous",
      "about.title": "Deux idées,<br>un projet <em>plein de couleurs.</em>",
      "about.description": "Nous sommes <strong>Tamires</strong> et <strong>Lucas</strong>, étudiants en formation technique de Développement de Systèmes à Campinas. Nous avons créé <strong>Monthly Colors</strong> comme projet de fin d’études afin de réunir, de manière claire et visuelle, les couleurs, les campagnes et les significations présentes dans chaque mois de l’année.<br><br>Nous associons recherche, design et programmation pour transformer l’information en une expérience plus simple, intéressante et facile à explorer. Pour nous, la technologie est aussi une façon de communiquer des idées, d’éveiller la curiosité et de créer quelque chose qui possède sa propre identité.",
      "about.educationLabel": "Formation",
      "about.educationText": "Développement de Systèmes",
      "about.projectLabel": "Projet",
      "about.cityLabel": "Ville",
      "footer.project": "Projet de fin d’études 2026 - Développé par Lucas Cruz et Tamires Alves - Monthly Colors",
      "month.january": "Janvier",
      "month.february": "Février",
      "month.march": "Mars",
      "month.april": "Avril",
      "month.may": "Mai",
      "month.june": "Juin",
      "month.july": "Juillet",
      "month.august": "Août",
      "month.september": "Septembre",
      "month.october": "Octobre",
      "month.november": "Novembre",
      "month.december": "Décembre",
      "month.january.short": "Jan",
      "month.february.short": "Fév",
      "month.march.short": "Mar",
      "month.april.short": "Avr",
      "month.may.short": "Mai",
      "month.june.short": "Juin",
      "month.july.short": "Juil",
      "month.august.short": "Août",
      "month.september.short": "Sept",
      "month.october.short": "Oct",
      "month.november.short": "Nov",
      "month.december.short": "Déc",
    },
    es: {
      "common.loading": "Cargando...",
      "language.select": "Seleccionar idioma",
      "nav.about": "Sobre nosotros",
      "nav.goMonths": "Ir a la sección de meses",
      "season.summer": "Verano",
      "season.autumn": "Otoño",
      "season.winter": "Invierno",
      "season.spring": "Primavera",
      "home.eyebrow": "¿Qué es Monthly Colors?",
      "home.title": "Cada mes tiene un color,<br>una historia y un motivo<br>para celebrar.",
      "home.description": "El calendario reúne mucho más que números y días festivos. A lo largo del año, cada mes lleva consigo colores, símbolos, campañas, acontecimientos y tradiciones que forman parte de la vida cotidiana, aunque sus significados no siempre sean conocidos. En esta página, esa información se organiza visualmente para explicar de dónde surgen estas asociaciones, por qué determinados temas cobran importancia en cada período y cómo los elementos culturales y naturales ayudan a construir la identidad de cada mes. Basta con elegir una de las opciones que aparecen a continuación para comenzar la exploración y conocer, de forma clara y amena, los detalles que hacen única cada etapa del año.",
      "home.colorsTitle": "Colores y campañas",
      "home.colorsText": "El color y el significado de cada campaña de concienciación del mes.",
      "home.datesTitle": "Fechas importantes",
      "home.datesText": "Festivos, fechas conmemorativas y eventos que no volverás a olvidar.",
      "home.moonTitle": "Fases de la Luna",
      "home.moonText": "Descubre cuándo la Luna estará llena, nueva, creciente o menguante cada mes.",
      "home.browseMonths": "Explora los meses",
      "about.pageTitle": "Sobre nosotros — Monthly Colors",
      "about.photoAlt": "Tamires y Lucas",
      "about.sectionLabel": "Sobre nosotros",
      "about.title": "Dos ideas,<br>un proyecto <em>lleno de color.</em>",
      "about.description": "Somos <strong>Tamires</strong> y <strong>Lucas</strong>, estudiantes del curso técnico de Desarrollo de Sistemas en Campinas. Creamos <strong>Monthly Colors</strong> como proyecto final para reunir, de forma clara y visual, los colores, las campañas y los significados presentes en cada mes del año.<br><br>Unimos investigación, diseño y programación para transformar la información en una experiencia más sencilla, interesante y fácil de explorar. Para nosotros, la tecnología también es una forma de comunicar ideas, despertar la curiosidad y crear algo con identidad propia.",
      "about.educationLabel": "Formación",
      "about.educationText": "Desarrollo de Sistemas",
      "about.projectLabel": "Proyecto",
      "about.cityLabel": "Ciudad",
      "footer.project": "Proyecto final 2026 - Desarrollado por Lucas Cruz y Tamires Alves - Monthly Colors",
      "month.january": "Enero",
      "month.february": "Febrero",
      "month.march": "Marzo",
      "month.april": "Abril",
      "month.may": "Mayo",
      "month.june": "Junio",
      "month.july": "Julio",
      "month.august": "Agosto",
      "month.september": "Septiembre",
      "month.october": "Octubre",
      "month.november": "Noviembre",
      "month.december": "Diciembre",
      "month.january.short": "Ene",
      "month.february.short": "Feb",
      "month.march.short": "Mar",
      "month.april.short": "Abr",
      "month.may.short": "May",
      "month.june.short": "Jun",
      "month.july.short": "Jul",
      "month.august.short": "Ago",
      "month.september.short": "Sep",
      "month.october.short": "Oct",
      "month.november.short": "Nov",
      "month.december.short": "Dic",
    },
  };

  const monthAttributeTranslations = {
    "pt-BR": {
      "Buscar": "Buscar",
      "Abrir menu de meses": "Abrir menu de meses",
      "Abrir ou fechar curiosidade": "Abrir ou fechar curiosidade",
      "Data anterior": "Data anterior",
      "Próxima data": "Próxima data",
      "Instagram do projeto Creatively": "Instagram do projeto Creatively",
      "Buscar no site...": "Buscar no site...",
    },
    en: {
      "Buscar": "Search",
      "Abrir menu de meses": "Open month menu",
      "Abrir ou fechar curiosidade": "Open or close fact",
      "Data anterior": "Previous date",
      "Próxima data": "Next date",
      "Instagram do projeto Creatively": "Creatively project on Instagram",
      "Buscar no site...": "Search the site...",
    },
    fr: {
      "Buscar": "Rechercher",
      "Abrir menu de meses": "Ouvrir le menu des mois",
      "Abrir ou fechar curiosidade": "Ouvrir ou fermer l’anecdote",
      "Data anterior": "Date précédente",
      "Próxima data": "Date suivante",
      "Instagram do projeto Creatively": "Projet Creatively sur Instagram",
      "Buscar no site...": "Rechercher sur le site...",
    },
    es: {
      "Buscar": "Buscar",
      "Abrir menu de meses": "Abrir el menú de meses",
      "Abrir ou fechar curiosidade": "Abrir o cerrar la curiosidad",
      "Data anterior": "Fecha anterior",
      "Próxima data": "Fecha siguiente",
      "Instagram do projeto Creatively": "Proyecto Creatively en Instagram",
      "Buscar no site...": "Buscar en el sitio...",
    },
  };

  const monthNames = {
    "pt-BR": ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
    en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    fr: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
    es: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
  };

  const monthAbbreviations = {
    "pt-BR": ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    fr: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"],
    es: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
  };

  const monthInterfaceTranslations = {
    "pt-BR": {
      "Mês": "Mês",
      "Verão": "Verão",
      "Outono": "Outono",
      "Inverno": "Inverno",
      "Primavera": "Primavera",
      "Paleta do mês": "Paleta do mês",
      "Campanhas de conscientização": "Campanhas de conscientização",
      "Significado do mês": "Significado do mês",
      "Calendário": "Calendário",
      "Você sabia?": "Você sabia?",
      "Fases da Lua": "Fases da Lua",
      "Nova": "Nova",
      "Crescente": "Crescente",
      "Cheia": "Cheia",
      "Minguante": "Minguante",
      "+ Google Agenda": "+ Google Agenda",
    },
    en: {
      "Mês": "Month",
      "Verão": "Summer",
      "Outono": "Autumn",
      "Inverno": "Winter",
      "Primavera": "Spring",
      "Paleta do mês": "Color palette",
      "Campanhas de conscientização": "Awareness campaigns",
      "Significado do mês": "Meaning of the month",
      "Calendário": "Calendar",
      "Você sabia?": "Did you know?",
      "Fases da Lua": "Moon phases",
      "Nova": "New",
      "Crescente": "Waxing",
      "Cheia": "Full",
      "Minguante": "Waning",
      "+ Google Agenda": "+ Google Calendar",
    },
    fr: {
      "Mês": "Mois",
      "Verão": "Été",
      "Outono": "Automne",
      "Inverno": "Hiver",
      "Primavera": "Printemps",
      "Paleta do mês": "Palette du mois",
      "Campanhas de conscientização": "Campagnes de sensibilisation",
      "Significado do mês": "Signification du mois",
      "Calendário": "Calendrier",
      "Você sabia?": "Le saviez-vous ?",
      "Fases da Lua": "Phases de la Lune",
      "Nova": "Nouvelle",
      "Crescente": "Croissante",
      "Cheia": "Pleine",
      "Minguante": "Décroissante",
      "+ Google Agenda": "+ Google Agenda",
    },
    es: {
      "Mês": "Mes",
      "Verão": "Verano",
      "Outono": "Otoño",
      "Inverno": "Invierno",
      "Primavera": "Primavera",
      "Paleta do mês": "Paleta del mes",
      "Campanhas de conscientização": "Campañas de concienciación",
      "Significado do mês": "Significado del mes",
      "Calendário": "Calendario",
      "Você sabia?": "¿Sabías que?",
      "Fases da Lua": "Fases de la Luna",
      "Nova": "Nueva",
      "Crescente": "Creciente",
      "Cheia": "Llena",
      "Minguante": "Menguante",
      "+ Google Agenda": "+ Google Calendar",
    },
  };

  function mergeTranslations(extraTranslations) {
    if (!extraTranslations) return;

    SUPPORTED_LANGUAGES.forEach((language) => {
      Object.assign(translations[language], extraTranslations[language] || {});
    });
  }

  mergeTranslations(window.MONTHLY_COLORS_TRANSLATIONS);

  const pageTextTranslations = window.MONTHLY_COLORS_PAGE_TRANSLATIONS || {};

  function getStoredLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.includes(stored)) return stored;
    return "pt-BR";
  }

  function translateKey(key, language) {
    return translations[language]?.[key] ?? translations["pt-BR"]?.[key];
  }

  function applyTranslations(language) {
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const value = translateKey(element.dataset.i18n, language);
      if (value !== undefined) element.textContent = value;
    });

    document.querySelectorAll("[data-i18n-html]").forEach((element) => {
      const value = translateKey(element.dataset.i18nHtml, language);
      if (value !== undefined) element.innerHTML = value;
    });

    ["placeholder", "title", "aria-label", "alt"].forEach((attribute) => {
      const datasetName = `i18n${attribute
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")}`;

      document.querySelectorAll(`[data-i18n-${attribute}]`).forEach((element) => {
        const value = translateKey(element.dataset[datasetName], language);
        if (value !== undefined) element.setAttribute(attribute, value);
      });
    });

    if (isMonthPage) applyMonthAttributeTranslations(language);
  }

  function applyMonthAttributeTranslations(language) {
    const dictionary = monthAttributeTranslations[language] || monthAttributeTranslations["pt-BR"];

    document.querySelectorAll("[aria-label], [placeholder]").forEach((element) => {
      ["aria-label", "placeholder"].forEach((attribute) => {
        if (!element.hasAttribute(attribute)) return;

        const dataKey = attribute === "aria-label" ? "mcOriginalAriaLabel" : "mcOriginalPlaceholder";
        const original = element.dataset[dataKey] || element.getAttribute(attribute);
        element.dataset[dataKey] = original;

        if (dictionary[original]) element.setAttribute(attribute, dictionary[original]);
      });
    });
  }

  function applyMonthLocalFallback(language) {
    if (!isMonthPage || language === "pt-BR") return;

    const translatedMonths = monthNames[language];
    const translatedAbbreviations = monthAbbreviations[language];
    const interfaceDictionary = monthInterfaceTranslations[language];
    const pageDictionary = pageTextTranslations[language] || {};

    if (pageDictionary[document.title]) document.title = pageDictionary[document.title];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const textNodes = [];

    while (walker.nextNode()) textNodes.push(walker.currentNode);

    textNodes.forEach((node) => {
      const parent = node.parentElement;
      if (!parent || parent.closest("script, style, [translate='no'], .notranslate")) return;

      const original = node.nodeValue;
      const trimmed = original.trim();
      if (!trimmed) return;

      const prefix = original.slice(0, original.indexOf(trimmed));
      const suffix = original.slice(original.indexOf(trimmed) + trimmed.length);
      let translated = pageDictionary[trimmed] || interfaceDictionary[trimmed] || trimmed;

      monthNames["pt-BR"].forEach((portugueseMonth, index) => {
        translated = translated
          .replaceAll(portugueseMonth.toUpperCase(), translatedMonths[index].toUpperCase())
          .replaceAll(portugueseMonth, translatedMonths[index]);
      });

      const abbreviationIndex = monthAbbreviations["pt-BR"].indexOf(trimmed);
      if (abbreviationIndex >= 0) translated = translatedAbbreviations[abbreviationIndex];

      translated = translated.replace(/\bMês\b/g, interfaceDictionary["Mês"]);
      const nextValue = `${prefix}${translated}${suffix}`;
      if (nextValue !== original) node.nodeValue = nextValue;
    });
  }

  function observeLocallyTranslatedContent() {
    if (!isMonthPage || !Object.keys(pageTextTranslations).length) return;

    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;

      window.requestAnimationFrame(() => {
        scheduled = false;
        applyMonthLocalFallback(getStoredLanguage());
      });
    });

    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  function localizeCalendarEvents() {
    if (!isMonthPage || typeof window.addToCalendar !== "function") return;

    const originalAddToCalendar = window.addToCalendar;
    if (originalAddToCalendar.__monthlyColorsLocalized) return;

    const localizedAddToCalendar = function (date, title) {
      const language = getStoredLanguage();
      const translatedTitle = pageTextTranslations[language]?.[title] || title;
      return originalAddToCalendar(date, translatedTitle);
    };

    localizedAddToCalendar.__monthlyColorsLocalized = true;
    window.addToCalendar = localizedAddToCalendar;
  }

  function siteCookiePath() {
    const match = window.location.pathname.match(/^(.*\/)(?:Month|container)\//i);
    return match ? match[1] : "/";
  }

  function expireGoogleCookie(path) {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; SameSite=Lax`;
  }

  function migrateToLocalTranslations() {
    if (localStorage.getItem(STORAGE_SCHEMA_KEY) === STORAGE_SCHEMA_VERSION) return;

    localStorage.setItem(STORAGE_KEY, "pt-BR");
    localStorage.setItem(STORAGE_SCHEMA_KEY, STORAGE_SCHEMA_VERSION);

    const path = siteCookiePath();
    expireGoogleCookie(path);
    if (path !== "/") expireGoogleCookie("/");
  }

  function injectSelectorWhenMissing() {
    /* O seletor existe somente na página principal. As páginas internas
       apenas leem o idioma salvo, sem criar outro menu. */
    return;
  }

  function updateSelector(language, animate) {
    const currentFlag = document.getElementById("currentFlag");
    const currentFlagFrame = document.querySelector(".current-flag-frame");
    const info = languageInfo[language];

    if (currentFlag && info) {
      const newSource = info.flag;

      const swapFlag = () => {
        currentFlag.src = newSource;
        currentFlag.alt = info.flagAlt;
        if (currentFlagFrame) currentFlagFrame.dataset.currentLanguage = language;
      };

      if (animate && currentFlagFrame) {
        const preloadedFlag = new Image();
        let swapStarted = false;

        const startSwap = () => {
          if (swapStarted) return;
          swapStarted = true;

          currentFlagFrame.classList.remove("mc-flag-swap-in");
          currentFlagFrame.classList.add("mc-flag-swap-out");

          window.setTimeout(() => {
            swapFlag();
            currentFlagFrame.classList.remove("mc-flag-swap-out");
            currentFlagFrame.classList.add("mc-flag-swap-in");
            window.setTimeout(
              () => currentFlagFrame.classList.remove("mc-flag-swap-in"),
              180,
            );
          }, 110);
        };

        preloadedFlag.addEventListener("load", startSwap, { once: true });
        preloadedFlag.addEventListener("error", startSwap, { once: true });
        preloadedFlag.src = newSource;
        if (preloadedFlag.complete) startSwap();
      } else {
        swapFlag();
      }
    }

    document.querySelectorAll(".lang-option").forEach((option) => {
      const isSelected = option.dataset.lang === language;
      option.classList.toggle("is-selected", isSelected);
      option.setAttribute("aria-checked", String(isSelected));
    });
  }

  function closeMenu() {
    document.getElementById("langMenu")?.classList.remove("active");
    document.getElementById("downarrow")?.classList.remove("rotate");
  }

  function setLanguage(language, options = {}) {
    if (!SUPPORTED_LANGUAGES.includes(language)) language = "pt-BR";

    localStorage.setItem(STORAGE_KEY, language);

    applyTranslations(language);
    applyMonthLocalFallback(language);
    document.documentElement.dataset.mcLanguageReady = "true";
    updateSelector(language, Boolean(options.animate));
    closeMenu();

    window.dispatchEvent(
      new CustomEvent("monthlycolors:languagechange", {
        detail: { language },
      }),
    );
  }

  function initializeSelector() {
    injectSelectorWhenMissing();

    const selector = document.querySelector("[data-language-selector]");
    selector?.classList.add("notranslate");
    selector?.setAttribute("translate", "no");

    const menu = document.getElementById("langMenu");
    const arrow = document.getElementById("downarrow");
    const toggle = document.querySelector(".lang-btn");

    toggle?.addEventListener("click", (event) => {
      event.stopPropagation();
      menu?.classList.toggle("active");
      arrow?.classList.toggle("rotate");
    });

    document.querySelectorAll(".lang-option").forEach((option) => {
      option.addEventListener("click", () => {
        setLanguage(option.dataset.lang, { animate: true, userInitiated: true });
      });
    });

    document.addEventListener("click", (event) => {
      const selector = document.querySelector("[data-language-selector]");
      if (selector && !selector.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  window.MonthlyColorsI18n = {
    setLanguage,
    getLanguage: getStoredLanguage,
    translateText(source) {
      const language = getStoredLanguage();
      return pageTextTranslations[language]?.[source] || source;
    },
    register(extraTranslations) {
      mergeTranslations(extraTranslations);
      setLanguage(getStoredLanguage());
    },
  };

  migrateToLocalTranslations();
  initializeSelector();
  setLanguage(getStoredLanguage());
  localizeCalendarEvents();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", localizeCalendarEvents, { once: true });
  }
  observeLocallyTranslatedContent();
})();
