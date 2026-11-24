# Live Metal Price API Research & Integration Report

## 1. Executive Summary
दागिन्यांच्या ई-कॉमर्स वेबसाईटसाठी रोजचे सोन्या-चांदीचे भाव बदलत असल्याने दागिन्यांची अंतिम किंमत (Dynamic Calculation) अचूक आणि आपोआप अपडेट होणे अत्यंत गरजेचे आहे. या अहवालामध्ये मोफत आणि सशुल्क APIs ची तुलना, अचूकता आणि १००% मोफत टियरमध्ये ही सिस्टीम अखंड चालवण्यासाठीची उपाययोजना मांडली आहे.

---

## 2. API Comparison Matrix

| Feature / Metric | **GoldAPI.io** (Recommended) | **MetalpriceAPI.com** | **RapidAPI (Gold Live Rates)** | **Web Scraping (IBJA / Goodreturns)** |
| :--- | :--- | :--- | :--- | :--- |
| **Free Tier Limit** | **100 Requests / Month** (Free forever) | **50 Requests / Month** | बदलत्या मर्यादा (काही 500/mo) | Free (पण तुटण्याची शक्यता असते) |
| **Supported Metals** | Gold (24k, 22k, 21k, 18k, 14k), Silver, Platinum, Palladium | Gold, Silver, Base Metals | Gold, Silver | Gold & Silver |
| **INR (₹) Direct Support**| **होय (Direct INR / Gram)** | होय (Direct INR / Ounce or Gram) | होय (INR 10g or 1g) | होय |
| **Accuracy & Realtime** | सराफा बाजारातील अचूक 99.9% दर | फॉरेक्स बेस्ड रिअल-टाईम दर | मध्यम ते उच्च | स्थानिक सराफा दर |
| **Reliability (SLA)** | 99.9% Up-time, JSON Format | 99.8% Up-time | API प्रोव्हायडरवर अवलंबून | कमी (Website HTML बदलल्यास बंद पडते) |
| **Paid Plan Starting** | \$10 / month (5,000 requests) | \$9.99 / month | \$5 - \$15 / month | लागू नाही |

---

## 3. Best Recommended Strategy (100% Free Forever Architecture)

जर आपण थेट ग्राहकाने वेबसाईट उघडल्यावर दर सेकंदाला API कॉल केले, तर Free Tier चा कोटा काही तासांत संपू शकतो.  
त्यामुळे **स्मार्ट कॅशिंग + फॉलबॅक डिझाईन (Smart Caching & Fallback Architecture)** वापरले जाईल:

```
[ GoldAPI.io / Free Source ]
          │
          ▼ (दिवसातून 1 ते 2 वेळा किंवा ॲडमिन Sync वरच API कॉल)
[ Supabase `metal_rates` Table ] ◄─── [ Admin Manual Override (मॅन्युअली बदलण्याची सोय) ]
          │
          ▼ (स्थानिक डेटाबेसमधून सर्व ग्राहकांसाठी अल्ट्रा-फास्ट लोड)
[ Dynamic Customer Storefront ]
   - Top Header Live Ticker (24K Gold, 22K Gold, 925 Silver)
   - Product Details: Live Weight × Metal Rate + Making + 3% GST
```

### या स्ट्रॅटेजीचे फायदे:
1. **१००% मोफत:** दररोज फक्त १ किंवा २ API कॉल होतील (महिन्याला ३० ते ६० कॉल्स), ज्यामुळे GoldAPI चा १०० कॉल्सचा **Free Tier कधीही संपणार नाही**.
2. **सुपरफास्ट स्पीड:** ग्राहकाची वेबसाईट एका सेकंदाच्या आत उघडेल, कारण API रिस्पॉन्सची वाट पहावी लागणार नाही.
3. **ऑफलाईन / एरर सुरक्षित (Fault Tolerant):** जर बाहेरील API तात्पुरते बंद असले, तरी आधीचे सेव्ह केलेले दर किंवा ॲडमिनने टाकलेले दर कायम कार्यरत राहतील.

---

## 4. Dynamic Jewellery Price Formula Implementation

$$\text{Final Customer Price} = \Big[ \big(\text{Weight in Grams} \times \text{Live Metal Rate per Gram}\big) + \text{Making Charges} + \text{Gemstone / Diamond Value} \Big] \times (1 + \text{GST 3\%})$$

* **उदा. २२ कॅरेट अंगठी (Weight: 4.5 ग्रॅम):**
  * २२ कॅरेट सोन्याचा भाव: ₹७,२५० प्रति ग्रॅम
  * शुद्ध धातू मूल्य: $4.5 \times 7250 = ₹३२,६२५$
  * मेकिंग चार्जेस: ₹१,५००
  * खडे / स्टोन्स: ₹५००
  * सबटोटल: ₹३४,६२५
  * GST (3%): ₹१,०३८.७५
  * **अंतिम किंमत:** **₹३५,६६४**
