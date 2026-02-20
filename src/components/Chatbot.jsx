import { useState, useRef, useEffect } from 'react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: 'Hello! Welcome to Triventa Exports. I\'m here to help you with questions about our premium coffee products, services, and more. What can I assist you with today?',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const fetchWeatherData = async (city) => {
    try {
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`)
      const geoData = await response.json()
      
      if (geoData.results && geoData.results[0]) {
        const { latitude, longitude, name, country } = geoData.results[0]
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&timezone=auto`)
        const weatherData = await weatherRes.json()
        return {
          location: `${name}, ${country}`,
          temp: weatherData.current.temperature_2m,
          timezone: weatherData.timezone
        }
      }
      return null
    } catch (error) {
      console.log('Weather fetch error:', error)
      return null
    }
  }

  const analyzeUserQuery = (userMessage) => {
    const words = userMessage.toLowerCase().split(/\s+/)
    const messageLength = words.length
    const fullMessage = userMessage.toLowerCase()
    
    // Intent and keyword analysis
    const intents = {
      product: /product|coffee|bean|arabica|robusta|variety|type|blend|espresso|grind/i,
      pricing: /price|cost|rate|bulk|order|minimum|quote|pay|payment|cheaper|discount|affordable/i,
      contact: /contact|phone|email|reach|call|message|whatsapp|support|help/i,
      location: /location|address|where|based|office|warehouse|facility|city|country|mangalore|karnataka|bangalore/i,
      quality: /quality|certif|standard|organic|fair trade|test|check|grade|excellence|premium|best/i,
      export: /export|ship|deliver|logistics|customs|international|shipping|freight|tariff/i,
      sustainability: /sustain|organic|farm|eco|environment|green|natural|pesticide|chemical/i,
      order: /order|buy|purchase|sample|minimum|quantity|bulk|how much|many/i,
      delivery: /delivery|ship|send|get|arrive|time|days|weeks|when|track|status/i,
      process: /process|how|method|make|manufacture|roast|grind|prepare|obtain|source|farming/i,
      weather: /weather|temperature|climate|warm|cold|rain|sunny|season|harvest/i,
      time: /time|what time|what's the time|current time|timezone/i
    }
    
    const matchedIntents = Object.entries(intents).map(([intent, regex]) => ({
      intent,
      matched: regex.test(fullMessage)
    })).filter(item => item.matched)
    
    return {
      words,
      messageLength,
      fullMessage,
      matchedIntents: matchedIntents.map(m => m.intent),
      isQuestion: fullMessage.includes('?'),
      isGreeting: /hello|hi|hey|greetings|namaste|good morning|good afternoon/i.test(fullMessage),
      isThankYou: /thank|thanks|appreciate|grateful/i.test(fullMessage),
      isFarewell: /bye|goodbye|see you|until|farewell|quit|exit/i.test(fullMessage)
    }
  }

  const getBotResponse = async (userMessage) => {
    const analysis = analyzeUserQuery(userMessage)
    const intents = analysis.matchedIntents
    
    // Handle weather queries
    if (intents.includes('weather')) {
      const cityMatch = userMessage.match(/in\s+([a-zA-Z\s]+)\?|(?:weather\s+in\s+)([a-zA-Z\s]+)|([a-zA-Z\s]+)(?:\s+weather)/i)
      const city = cityMatch ? (cityMatch[1] || cityMatch[2] || cityMatch[3]) : 'Mangalore'
      
      const weatherData = await fetchWeatherData(city.trim())
      if (weatherData) {
        return `Weather Information (Live Data)\n\nLocation: ${weatherData.location}\nCurrent Temperature: ${weatherData.temp}°C\nTimezone: ${weatherData.timezone}\n\nFun Fact:\nOur coffee farms in Mangalore thrive in optimal climate conditions for Arabica quality beans.\n\nWeather conditions significantly impact coffee harvest quality!`
      }
    }
    
    // Handle time queries
    if (intents.includes('time')) {
      const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit',
        hour12: true 
      })
      const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
      return `Current Time & Date\n\nTime: ${currentTime} (IST)\nDate: ${currentDate}\n\nBusiness Hours:\nMon - Fri: 9:00 AM - 6:00 PM IST\nSat - Sun: Closed\n\nFeel free to reach out during business hours!`
    }
    
    // Handle greetings
    if (analysis.isGreeting) {
      return 'Welcome to Triventa Exports! I\'m AI-powered assistant here to help. I can answer questions about:\n\nCoffee products & varieties\nPricing & bulk orders\nShipping & delivery\nQuality standards & certifications\nSustainability practices\nContact information\nWeather & climate data\nCurrent time & timezones\n\nWhat would you like to know?'
    }
    
    // Handle thank you
    if (analysis.isThankYou) {
      return 'You\'re very welcome! Feel free to ask me anything else about Triventa Exports. I\'m here to help with your coffee needs!'
    }
    
    // Handle farewell
    if (analysis.isFarewell) {
      return 'Thank you for chatting with us! We hope to serve you soon. Don\'t hesitate to reach out anytime you need assistance. Have a great day!'
    }
    
    // Analyze multiple intents for complex questions
    if (intents.length > 1) {
      if (intents.includes('product') && intents.includes('quality')) {
        return 'Great question! Our coffee undergoes rigorous quality testing:\n\nPRODUCTS:\nPremium Arabica - Smooth, balanced flavor\nRobusta - Bold, strong taste\nSpecialty Blends - Curated combinations\n\nQUALITY MEASURES:\nCertified Organic\nFair Trade Certification\nCupping evaluations\nMoisture & defect testing\nInternational standards compliance\n\nEach batch maintains our strict quality criteria. Interested in samples?'
      }
      if (intents.includes('pricing') && intents.includes('order')) {
        return 'Let me help with your order:\n\nORDER DETAILS:\nMinimum: 50 kg\nStandard: 500+ kg\nBulk: 5,000+ kg\n\nPRICING:\nPrices depend on:\nQuantity ordered\nCoffee type (Arabica/Robusta/Blend)\nProcessing\nDelivery location\n\nDirect Quote:\nContact our sales team:\nPhone: +91 91480 25018\nEmail: info@triventaexports.com\n\nWhat quantity interests you?'
      }
      if (intents.includes('export') && intents.includes('delivery')) {
        return 'We handle complete international export!\n\nSHIPPING:\n50+ countries served\nFast turnaround times\nFull customs documentation\nFlexible packaging options\n\nDELIVERY:\nOrigin: Mangalore, Karnataka\nTimeline: Depends on destination\nTracking available\nCompetitive shipping rates\n\nLOGISTICS:\nTrusted partners manage:\nDocumentation\nCustoms clearance\nTransportation\nInsurance options\n\nWhere are you located?'
      }
    }
    
    // Single intent responses
    if (intents.includes('product')) {
      return 'Our Premium Coffee Selection\n\nARABICA BEANS\nSmooth, balanced flavor\nHigher acidity, lower caffeine\nFloral & fruity notes\nBest for: Specialty drinks\n\nROBUSTA BEANS\nBold, strong taste\nHigher caffeine content\nEarthy, nutty notes\nBest for: Espresso blends\n\nSPECIALTY BLENDS\nCustom curated combinations\nUnique flavor profiles\nTailored to your needs\n\nAll organically grown in Karnataka.\nQuery about taste preferences?'
    }
    
    if (intents.includes('pricing')) {
      return 'Pricing Information\n\nOur competitive pricing depends on:\nCoffee type (Arabica/Robusta/Blend)\nQuantity (50kg - 5000kg+)\nProcessing method\nDelivery location\nOrder frequency\n\nPRICE TIERS:\nSmall: 50-500 kg\nStandard: 500-5000 kg\nBulk: 5000+ kg\n\nVolume discounts available!\n\nGET CUSTOM QUOTE:\nContact: +91 91480 25018\nEmail: info@triventaexports.com\n\nWhat\'s your target volume?'
    }
    
    if (intents.includes('contact')) {
      return 'Multiple Ways to Reach Us\n\nPHONE: +91 91480 25018\nEMAIL: info@triventaexports.com\nADDRESS: Mangalore, Karnataka, India\nHOURS: Mon-Fri, 9:00 AM - 6:00 PM IST\n\nOUR TEAM SPECIALIZES IN:\nProduct inquiries\nCustom orders\nBulk pricing\nExport documentation\nLogistics support\n\nResponse time: Usually within 2-4 hours\n\nWhat do you need help with?'
    }
    
    if (intents.includes('location')) {
      return 'About Our Location\n\nTRIVENTA EXPORTS\nMangalore, Karnataka, INDIA\n\nWHY MANGALORE?\nCoffee capital of India\nDirect access to estate farms\nModern processing facilities\nStrategic export hub\nExcellent shipping connectivity\n\nLOCAL ADVANTAGES:\nPremium bean sourcing\nQuality climate control\nFresh processing\nCompetitive shipping rates\nInternational port access\n\nWe ship globally to 50+ countries!\n\nLooking to establish partnership?'
    }
    
    if (intents.includes('quality')) {
      return 'Quality is Our Promise\n\nCERTIFICATIONS:\nCertified Organic\nFair Trade Verified\nInternational Export Standards\nISO Compliance\n\nTESTING PROCESS:\nCupping evaluations\nMoisture content analysis\nDefect screening\nFlavor profiling\nBatch consistency checks\n\nFARMING STANDARDS:\nSustainable practices\nNo harmful pesticides\nFair farmer wages\nBiodiversity protection\nSoil health maintenance\n\n100% QUALITY GUARANTEE\nEvery bean meets our highest standards!\n\nWant sample testing?'
    }
    
    if (intents.includes('export')) {
      return 'International Export Solutions\n\nGLOBAL REACH:\n50+ countries served\nAll documentation handled\nCustoms expertise\nReliable logistics partners\n\nPACKING OPTIONS:\nJute bags\nVacuum-sealed bags\nBulk containers\nCustom branding available\n\nSHIPPING:\nOcean freight\nAir cargo options\nDoor-to-door delivery\nReal-time tracking\n\nDOCUMENTATION:\nExport licenses\nHealth certificates\nPhytosanitary certificates\nBills of lading\n\nWhere\'s your destination?'
    }
    
    if (intents.includes('sustainability')) {
      return 'Committed to Sustainability\n\nECO-FRIENDLY PRACTICES:\nOrganic farming methods\nNo chemical pesticides\nNatural composting\nWater conservation\nShade-grown farming\n\nFARMER PARTNERSHIPS:\nFair trade pricing\nDirect relationships\nEducational support\nEquipment assistance\nCommunity development\n\nSUSTAINABLE PACKAGING:\nRecyclable materials\nBiodegradable options\nMinimal plastic use\nCompostable packaging\n\nENVIRONMENTAL IMPACT:\nCarbon-neutral shipping available\nForest conservation\nHabitat protection\nClimate action\n\nInterested in eco-certifications?'
    }
    
    if (intents.includes('order')) {
      return 'Ready to Order?\n\nORDER INFORMATION:\n\nMINIMUM QUANTITIES:\nSample orders: 5-10 kg\nStandard: 50-500 kg\nBulk: 500-5000+ kg\n\nLEAD TIMES:\nSample: 5-7 days\nStandard: 10-14 days\nBulk: 2-3 weeks\n\nPROCESS:\n1. Send inquiry with details\n2. Receive custom quote\n3. Finalize terms\n4. Payment & confirmation\n5. Processing & shipment\n\nWHAT WE NEED:\nQuantity required\nCoffee type preference\nDelivery location\nBudget (if flexible)\n\nSTART TODAY:\nEmail: info@triventaexports.com\nPhone: +91 91480 25018\n\nWhat specifications do you need?'
    }
    
    if (intents.includes('delivery')) {
      return 'Delivery & Shipping Information\n\nSHIPPING ORIGINS:\nMangalore Port (primary)\nDirect from warehouse\nProcessing facility\n\nTYPICAL TIMELINES:\nIndia: 3-7 days\nAsia: 5-10 days\nEurope: 15-22 days\nAmericas: 20-30 days\nAfrica: 10-18 days\n\nTRACKING:\nReal-time updates\nSMS notifications\nEmail alerts\nOnline portal\n\nSHIPPING METHODS:\nSea freight (economical)\nAir cargo (fast)\nCourier (small quantities)\nDDP/FCA options\n\nCOSTS:\nInclusive of insurance & handling!\n\nWhere are you shipping to?'
    }
    
    // Default response when intent is not recognized
    return 'I apologize! I couldn\'t quite understand your question.\n\nNo worries though! Our team is here to help you directly:\n\nCALL US NOW:\n+91 91480 25018\n\nEmail:\ninfo@triventaexports.com\n\nBusiness Hours:\nMon - Fri: 9:00 AM - 6:00 PM IST\n\nOur team responds quickly and can answer any questions about:\nCoffee products\nPricing & bulk orders\nShipping & delivery\nQuality certifications\nSustainability\nWeather data\nTime & timezones\n\nFeel free to call or email - we\'re always happy to help!'
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: inputValue,
      timestamp: new Date()
    }

    const userText = inputValue
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate bot typing with variable delay
    const delay = Math.min(800 + (userText.length / 10), 2000)
    
    setTimeout(async () => {
      let botResponse = await getBotResponse(userText)
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, delay)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const toggleChat = (open) => {
    setIsOpen(open)
  }

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'bot',
        text: 'Hello! 👋 Welcome to Triventa Exports. I\'m here to help you with questions about our premium coffee products, services, and more. What can I assist you with today?',
        timestamp: new Date()
      }
    ])
  }

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <h3>Triventa Support (Beta)</h3>
            </div>
            <div className="chatbot-header-actions">
              <button 
                className="chatbot-clear-btn"
                onClick={clearChat}
                aria-label="Clear chat"
                title="Clear conversation"
              >
                ↻ Clear
              </button>
              <button 
                className="chatbot-close-btn"
                onClick={() => toggleChat(false)}
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
          </div>
          
          <div className="chatbot-messages">
            {messages.map(message => (
              <div key={message.id} className={`message message-${message.type}`}>
                <div className="message-content">
                  {message.text.split('\n').map((line, idx) => (
                    <div key={idx}>{line}</div>
                  ))}
                  <span className="message-time">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message message-bot">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              autoFocus
              disabled={isTyping}
            />
            <button 
              className="chatbot-send-btn"
              onClick={handleSendMessage}
              aria-label="Send message"
              disabled={isTyping || !inputValue.trim()}
            >
              ➤
            </button>
          </div>
        </div>
      )}
      
      {!isOpen && (
        <button
          className="chatbot-toggle-btn"
          onClick={() => toggleChat(true)}
          aria-label="Open chat"
          title="Chat with us!"
        >
          💬
        </button>
      )}
    </div>
  )
}
