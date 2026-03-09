import streamlit as st
from groq import Groq

st.set_page_config(layout="wide")

client = Groq(api_key="")

col1, col2 = st.columns([1,2])

with col1:
    mode = st.radio(
        "Task",
        ["Email", "Grammar", "Shorten"],
        horizontal=True
    )

with col2:
    context = st.text_input(
        "Context",
        "Use simple Indian English and avoid complex words."
    )

text_col, button_col = st.columns([8,1])

with text_col:
    text = st.text_area("Enter your text")

with button_col:
    st.write("")
    st.write("")
    generate = st.button("Generate")

if generate and len(text.strip()) > 5:

    if mode == "Grammar":
        prompt = f"""{context}
Fix grammar of the following text.

Text:
{text}
"""

    elif mode == "Email":
        prompt = f"""{context}
Write a professional email and must be very concise and if possible 2–3 lines.

Topic:
{text}
"""

    elif mode == "Shorten":
        prompt = f"""{context}
Make the following text shorter.

Text:
{text}
"""

    with st.spinner("AI is writing..."):

        stream = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[{"role": "user", "content": prompt}],
            stream=True
        )

        st.subheader("Result")
        result_placeholder = st.empty()

        full_response = ""

        for chunk in stream:
            if chunk.choices[0].delta.content:
                full_response += chunk.choices[0].delta.content
                result_placeholder.markdown(full_response)
