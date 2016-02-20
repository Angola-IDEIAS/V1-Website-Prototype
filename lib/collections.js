/**
* Describes collection for user registration and idea registration
*
* TODO: make fields conditionally required by following these instructions:
* https://github.com/aldeed/meteor-autoform/issues/85
*/


Ideas = new Mongo.Collection("ideas");
UserInfo = new Mongo.Collection("userinfo");

// helpers for UserInfo collection
var ethnic_groups = ['Ovimbundu', 'Ambundu', 'Bakongo', 'Other'];
var provinces = ["Bengo","Benguela","Bié","Cabinda","Cuando Cubango","Cuanza Norte","Cuanza Sul","Cunene","Huambo","Huíla","Luanda","Lunda Norte","Lunda Sul","Malanje","Moxico","Namibe","Uíge","Zaire"];
var sexes = ['Homem', 'Mulher'];
var occupations = ['Student', 'Unemployed', 'Employed Part-Time', 'Employed Full-Time', 'Self-employed'];

// helpers for Ideas collection
var industries = ["Educação","Saúde","Comércio","Agriculture/Livestock","Bakery","Computer-related applications","Construction","Carpintry","Other skilled trades","Destillery/Brewery","Child care","Clothing","Fishing","Food Production  & Manufacturing","Manufacturing","Food & Beverages","Retail Store","Other services"]

province_to_commune = {
  "Bengo" : ["Ambriz", "Kakalo-Kahango", "Ícolo e Bengo", "Cassoneca", "Bela Vista", "Tabi", "Zala", "Kikabo", "Barra do Dande", "Muxiluando", "Kixico", "Kanacassala", "Gombe", "Kicunzo", "Kage", "Mabubas", "Caxito", "Ucua", "Piri", "Kibaxe", "São José das Matas", "Kiaje", "Paredes", "Bula-Atumba", "Pango-luquem", "Kabiri", "Bom Jesus", "Catete", "Calomboloca", "Kazua", "Muxima", "Dembo Chio", "Mumbondo", "Kixinje"],
  "Benguela" : ["Alda Lara", "Asfalto", "Babaera", "Balombo", "Benfica", "Benguela", "Biópio", "Bocoio", "Candumbo", "Catumbela", "Chigongo", "Chikuma", "Chila", "Chindumbo", "Chongorói", "Compão", "Cote", "Cubal", "Cubal do Lumbo", "Dombe Grande", "Lobito Canata", "Catumbela", "Egito", "Monte Belo", "Passe", "Caimbambo", "Catengue", "Baia Farta", "Cupupa", "Imbala", "Quendo", "Chiongoroi", "Capupa", "Bolongueira", "Ganda", "Babaera", "Kasseque", "Chicurnu", "Ebanga"],
  "Bié" : ["Munhango", "Caivera", "Sachinemuna", "Andulo", "Belo Horizonte", "Cambândua", "Chicala", "Chinguar", "Chipeta", "Chitembo", "Chiuca", "Chivaúlo", "Dando", "Gamba", "Kachingues", "Kaiei", "Kalucinga", "Kamakupa", "Kangote", "Kassumbe", "Katabola", "Kuemba", "Kuito", "Kunhinga", "Kunje", "Kutato", "Kwanza", "Luando", "Lúbia", "Malengue", "Mumbué", "Mutumbo", "Nharea", "Ringoma", "Sande", "Soma Kwanza", "Santo António da Muinha", "Trumba", "Umpulo"],
  "Cabinda" : ["Miconje", "Luali", "Cabinda", "Malembo", "Tanto-Zinze", "Landana", "Massabi", "Inhuca", "Necuto", "Belize"],
  "Cuando Cubango" : ["Baixo Longa", "Bondo", "Chinguanja", "Cuangar", "Dirico", "Kaiundo", "Kalai", "Kuchi", "Kueio", "Kuito Kuanavale", "Kutato", "Kutuile", "Longa", "Luengue", "Luiana", "Maue"],
  "Cuanza Norte" : ["Aldeia Nova", "Banga", "Danje - ia - Menha", "Dondo", "Golungo Alto", "Kaenda", "Kakulo", "Kamabatela", "Kambondo", "Kanhoca", "Kiangombe", "Kiculungo", "Kilombo dos Dembos", "Kissola", "Luinga", "Lucala", "Massangano", "Maúa", "Ndalatando", "Quiage", "Quibaxe", "São Pedro da Kilemba", "Samba Cajú", "Samba Lukala", "Tango", "Zenza do Itombe", "Bindo", "Bolongongo", "Cariamba", "Terreiro", "Quiquemba", "Cacongo", "Cerca", "Camome", "Cavunga", "Kiluanje"],
  "Cuanza Sul" : ["Assango", "Botera", "Dumbi", "Ebo", "Gabela", "Gangula", "Kabuta", "Kalulo", "Kapolo", "Kariango", "Kassanje", "Kassongue", "Kibala", "Kienha", "Kikombo", "Kilenda", "Kissanga Kungo", "Kissongo", "Konda", "Kungo e Sanga", "Kunjo", "Munenga", "Mussende", "Ndala Kachibo", "Pambangala", "Quissanga", "Sanga", "São Lucas", "Ucu–Seles", "Waco Cungo", "Sumbe", "Porto Amboim", "Quipaze", "Atome", "Quirimbo", "Ambovia"],
  "Cunene" : ["Bangula", "Cacite", "Castilhos", "Chitado", "Evale", "Humbe", "Kafima", "Kahama", "Angola", "Kalonga", "Kuvati", "Kuvelai", "Môngua", "Mukope", "Mupa", "Namakunde", "Naulila", "Ombala yo Mungu", "Ondjiva", "Oximolo", "Shiede", "Xangongo", "Nehone Cafima", "Evale", "Simporo", "yonde", "Xagongo", "Oncócua", "Otthinjau"],
  "Huambo" : ["Alto–Uama", "Bailundo", "Bimbe", "Chiaca", "Chinhama", "Chinjenje", "Chipipa", "Chiumbo", "Huambo", "Kaála", "Kachiungo", "Kakoma", "Kalenga", "Kalima", "Kambuengo", "Katabola", "Katata", "Kuima", "Lépi", "Londuimbali", "Longonjo", "Lunge", "Mbave", "Mungo", "Sambo", "Tchipeio", "Thicala Yhilohanga", "Ukuma", "Ussoke", "Hengue-Caculo", "Ecuma", "Tchiahana", "Chilata", "Tchiumbo", "Hungulo", "Mundundo"],
  "Huíla" : ["Cacula", "Cacula-Sede", "Capunda-Cavilongo", "Chiange-Sede", "Chibemba", "Chibia-sede", "Chicomba", "Chipindo", "Dongo", "Galangue", "Gungue", "Humpata-Sede", "Jamba", "Jau", "Kakonda", "Kalépi", "Kalukembe", "Kassinga", "Kilengue Kusse", "Kutenda", "Kuvango", "Lubango", "Matala", "Ngola", "Quihita", "Quipungo-Sede", "Tchipungo", "Uaba", "Santo Arina", "Huila", "Quilengues", "Dinde", "Imulo", "Degola", "Cusse", "Bambi", "Vincungo", "Tchibembe", "Capelango", "Mulondo"],
  "Luanda" : ["Bairro Operário", "Barra do Cuanza", "Benfica e Mussulo", "Cacuaco", "Camama", "Cassequel", "Cazenga", "Corimba", "Da Ilha", "Futungo de Belas", "Golfe (Luanda)", "Havemos de Voltar", "Hoji Ya Henda", "Kinanga", "Margal", "Neves Bendinha", "Ngola Kiluange", "Prenda", "Ramiro (Luanda)", "Rangel (Luanda)", "Rocha Pinto", "Sambizanga", "Tala Hady", "Terra Nova (Luanda)", "Vila Estoril", "Cuca (Luanda)", "Ilha do Cabo", "Patrice Lumuba", "Maculusso", "Kilamba Kiaxi", "Palanca (Luanda)", "Malanga (Luanda)", "Samba", "Angola", "Funda", "Quicolo", "Viana", "Angola", "Calumbo"],
  "Lunda Norte" : ["Iongo", "Kachimo", "Kamaxilo", "Kambulo", "Kamissombo", "Kanzar", "Kapenda Kamulemba", "Kaungula", "Kuango", "Lóvua", "Luachimo", "Luia", "Luremo", "Xa–Cassau", "Xá-Muteba", "Xinge", "Lucapa", "Sombo", "Capaia", "Thitato", "Cuilo", "Caluango", "Iubalo", "Muvulege", "Luangue", "Cassengue", "Quitapa"],
  "Lunda Sul" : ["Alto-Chikapa", "Chiluage", "Dala", "Angola", "Kakolo", "Kassai-Sul", "Kukumbi", "Mona-Kimbundo", "Mukonda", "Murieje", "Saurimo", "Sombo", "Xassengue", "Cazeje", "Luma Cassai"],
  "Malanje" : ["Cacuso", "Cinguengue", "Kacuso", "Pungo-Andongo", "Cuale", "Quinge", "Cambundy", "Catembo", "Dumba (Malanje)", "Cabango", "Tala Mungongo", "Bembo (Malanje)", "Caombo", "Micanda", "Luquembo", "Capunda", "Dombo", "Marimba", "Angola", "Quimbango", "Quihuhu", "Muquize", "Catala", "Quirima", "Saltar", "Cazongo", "Cainda", "Calunda", "Lovua", "Lumbala", "Candundo", "Macondo", "Lumbala-Ngimbo", "Chiume", "Lumai", "Lutembo", "Mussuma", "Ninda", "Sessa", "Kalamagia", "Kalandula", "Kambaxe", "Kambo", "Kambondo", "Kangandala", "Kangando", "Karibo", "Kateco-Kangola", "Kaxinga", "Kela", "Kimambamba", "Kissele", "Kiuaba-Nzoji", "Kizenga", "Kota", "Kunda-iá-Baze", "Lombe", "Malanje", "Massango", "Mikixi", "Milando", "Moma", "Mufuma", "Mukari", "Ngola-Luije", "Sokeko", "Tembo-Aluma", "Xandele"],
  "Moxico" : ["Alto Zambeze", "Chiume", "Kaianda", "Kalunda", "Kamanongue", "Kangamba", "Kangumbe", "Kavungo", "Lago-Dilolo", "Léua", "Liangongo", "Lóvua", "Luakano", "Lukusse", "Lumbala-Kakengue", "Lumbala-Nguimbo", "Lumeje Kameia", "Lutembo", "Lutuai ou Muangai", "Macondo", "Mussuma", "Ninda", "Tempué", "Sessa", "Cassamba", "Muié"],
  "Namibe" : ["Baia dos Tigres", "Bairro Dos Corações", "Bairro Heróis", "Bentiaba", "Bibala-Sede", "Cainde", "Caitou", "Camacuio-Sede", "Chingo (Namibe)", "Kapagombe", "Lola (Namibe)", "Mamué", "Mucaba", "Muinho", "Savo-Mar", "Tômbua", "Torre do Tambo", "Virei-Sede", "Yona (Namibe)", "Namibe", "Lucira"],
  "Uíge" : ["Aldeia Viçosa", "Alto Zaza", "Bembe", "Beu", "Buengas", "Bungo", "Cambembe", "Cuilo Pombo", "Dimuca", "Kinvuenga", "Lucanga", "Mabaia", "Macuba", "Mbanza Nnosso", "Quinzala", "Sacandica", "Uamba", "Vista Alegre (Uíge)", "Uíge", "Negage", "Dimuca", "Quisseque", "Puri", "Angola", "Cangola", "Mengo", "Caiongo", "Sanza Pompo", "Milunga", "Macocola", "Massau", "Macolo", "Quibele", "Cuango", "Icoca", "Nova Esperança (Uíge)", "Qitexe", "Cuilo-Camboso", "Cambamba", "Songo", "Nova Caipenba", "Quipedro", "Camatambo", "Lembua", "Petecussso", "Maquela do Zombo", "Quibocolo", "Cuilo", "Futa (Uíge)"],
  "Zaire" : ["Kanda", "Kelo", "Kiende", "Kindeji", "Kinzau", "Kiximba", "Kuimba", "Loje-Kibala", "Luvu", "Mangue Grande", "Mbanza Kongo", "Mbuela", "Mussera", "Nkalambata", "Nóqui", "Nzeto", "Pedra de Feitiço", "Soyo", "Sumba", "Caluca", "Nadinba", "Buela", "Luvaca", "Lufico", "Mpala Lulendo", "Loge", "Tomboco", "Quingombe", "Caluca", "Nadimba", "Buela"]
}

// define schema for UserInfo collection
UserInfo.attachSchema(new SimpleSchema({
  first_name: {
    type: String,
    label: "Nome",
    max: 200
  },

  last_name: {
    type: String,
    label: "Apellido",
    max: 200
  },

  sex: {
    type: String,
    label: "Sexo",
    allowedValues: sexes
  },

  dob: {
    type: Date,
    label: "Data de nascimento",
    autoform: {
      afFieldInput: {
        type: "bootstrap-datepicker"
      }
    }
  },

  ethnic_group: {
    type: String,
    label: "Grupo étnico",
    allowedValues: ethnic_groups
  },

  province: {
    type: String,
    label: "Província",
    allowedValues: provinces
  },

  commune: {
    type: String,
    label: "Comuna"
  },

  current_occupation: {
    type: String,
    label: "Ocupação atual",
    allowedValues: occupations
  }
}));

// define schema for ideas collection

Ideas.attachSchema(new SimpleSchema({
  idea_name: {
    type: String,
    label: "Nome da idéia"
  },

  industry: {
    type: String,
    label: "Área / Industria",
    allowedValues: industries
  }, 

  objective: {
    type: String,
    label: "Objetivo",
    allowedValues: ['Projeto de negócio', 'Projeto da comunidade']
  },

  // alternatively:
  // ask if online or lugar fisico,
  // and only if lugar fisico, ask if em casa or em um local
  location: {
    type: String,
    label: "Localização do negócio potencial?",
    allowedValues: ['Online', 'Em casa', 'Em um local'],
    optional: true
  },

  startup_size: {
    type: String,
    label: "Tamanho da empresa potencial?",
    allowedValues: ["Empresa unipessoal", 
      "Microempresa (+ 1- 2 trabalhadores)", 
      "Empresa pequena (3 - 5 trabalhadores)", 
      "Empresa mediana (5 - 10 trabalhadores)", 
      "Empresa grande (10+ trabalhadores)"],
    optional: true
  },

  register_formally: {
    type: String,
    label: "Estaria interessado em registrar o seu negócio quando criado?",
    allowedValues: ["Não", "Sim"],
    optional: true
  },

  service_or_product: {
    type: String,
    label: "Estaria fornecendo um serviço ou um produto?",
    allowedValues: ["Produto", "Serviço"],
    optional: true
  },

  business_description: {
    type: String,
    label: "Descreva a sua idéia de negócio",
    rows: 5,
    optional: true
  },

  impact_area: {
    type: String,
    label: "Área de impacto do projeto de comunidade",
    allowedValues: [
      "Bairro",
      "Aldeia",
      "Cidade",
      "Comuna",
      "Província",
      "País"
    ],
    optional: true
  },

  community_project_description: {
    type: String,
    label: "Descreva a sua idéia de projeto",
    rows: 5,
    optional: true
  },
}));


