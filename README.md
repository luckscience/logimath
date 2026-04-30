
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


# LogiMath

LogiMath es una plataforma web dedicada a la resolución de problemas matematicos usando lógica matematica y pensamiento creativo, dando la oportunidad a los usuarios de competir por ser el mejor en el ranking de clasificación.

LogiMath te presenta problemas que deberas resolver analizando cada expresión y formulando una forma en que llegaras al resultado. Al ingresar la respuesta se validara, si es correcta ganas puntos para tu perfil, si es incorrecta te dira que tienes 2 oportunidades más.

En caso de no poder resolverlo en las 3 oportunidades se te da la opción de revelar la respuesta paso por paso, fomentando que aunque no lo resuelvas, entiendas el ejercicio y te animes a itentarlo con otros ejercicios.


## Contenido de la web

 - Landing page informativa sobre el uso de la plataforma.
 - Pagina con un ejercicio de ejemplo.


## Sintaxis de componentes
### Header
Caso simple:
<Header 
  segments={[
    { text: "Inicio", route: "/#home" },
    { text: "Acerca de", route: "/#about" },
    { text: "Contacto", route: "/#contact" }
  ]}
/>

Caso completo:
<Header 
  segments={[
    { 
      text: "Inicio", 
      route: "/#home", 
      color: "#F4E13A",
      fontWeight: "700"
    },
    { 
      text: "Blog", 
      route: "/blog", 
      fontSize: "20px" 
    },
    { 
      text: "Docs", 
      route: "/docs", 
      class: "uppercase tracking-wide" 
    }
  ]}
  rightSegments={[
    { 
      text: "Login", 
      route: "/login",
      color: "#00ffcc"
    }
  ]}
/>

### Footer
Sintaxis de uso:
  Sintaxis básica:
  <TypingTerminal text="Hola mundo" />

  Sintaxis compleja:
  <Typing 
    text="Texto completo a mostrar" 
    duration={2} // Duración total en segundos
    delay={0} // Retardo antes de iniciar en segundos
    color="#fff" // Color del texto
    class="clases-css-adicionales" // Clases CSS adicionales
  />

  Sintaxis con segmentos:
  <TypingTerminal 
    segments={[
      { text: "> ", class: "text-gray-500" },
      { text: "npm run dev", class: "text-green-500 font-semibold" }
    ]}
    duration={3}
    class="text-3xl"
  />
