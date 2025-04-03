import React from "react";

// 复制 renderCard 函数到这里 (或者创建一个共享的 utils 文件)
const renderCard = (cardHtml: JSX.Element, styleName: string) => (
  <div className="card-wrapper">
    <div className="card-inner-content">{cardHtml}</div>
    <div className="card-style-overlay">{styleName}</div>
  </div>
);

const ClaudeCards: React.FC = () => {
  return (
    <div className="card-gallery">
      {/* --- 在这里添加内部边框 div --- */}
      <div
        style={{
          position: "absolute",
          top: "12px", // 调整边距以适应这个卡片的 padding (25px)
          left: "12px",
          right: "12px",
          bottom: "12px",
          border: "1px solid rgba(212, 175, 110, 0.6)", // 可以调整透明度或颜色
          pointerEvents: "none",
          zIndex: 3, // 确保 zIndex 合适
        }}
      ></div>
      {/* --- 结束添加 --- */}
      {renderCard(
        // 柔和科技卡片风 (来自页面1)
        <div
          className="preview-card-tech_card"
          style={{
            width: "300px",
            height: "400px",
            background: "linear-gradient(145deg, #f9f4ff 0%, #fff8f8 100%)",
            padding: "25px",
            borderRadius: "16px",
            display: "grid",
            gridTemplateRows: "auto auto 1fr auto",
            boxShadow:
              "0 10px 25px rgba(149, 127, 239, 0.12), 0 5px 10px rgba(255, 188, 224, 0.08)",
          }}
        >
          <div
            style={{
              marginBottom: "15px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "#f0e7ff",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "#7b5dfa",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                AI
              </div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#b8a9e1",
                display: "flex",
                alignItems: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#4cd964",
                  borderRadius: "50%",
                }}
              ></span>
              在线
            </div>
          </div>
          <h2
            style={{
              fontSize: "22px",
              fontWeight: 600,
              color: "#333",
              marginBottom: "12px",
              letterSpacing: "-0.5px",
            }}
          >
            智能助手功能更新
          </h2>
          <div style={{ display: "grid", gridGap: "15px" }}>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  语音识别准确率
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#7b5dfa",
                  }}
                >
                  98.2%
                </span>
              </div>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#f0e7ff",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "98%",
                    height: "100%",
                    background: "linear-gradient(90deg, #7b5dfa, #bd4de6)",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                borderRadius: "12px",
                padding: "15px",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span style={{ fontSize: "14px", color: "#666" }}>
                  多轮对话能力
                </span>
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#ff6b9a",
                  }}
                >
                  92.7%
                </span>
              </div>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#ffecf2",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "93%",
                    height: "100%",
                    background: "linear-gradient(90deg, #ff6b9a, #ffad6f)",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            <div
              style={{
                backgroundColor: "#f9f0ff",
                padding: "8px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "11px", color: "#8e72d6" }}>能耗</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                -32%
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#fff0f5",
                padding: "8px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "11px", color: "#e078a8" }}>速度</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                +47%
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#fef9e7",
                padding: "8px",
                borderRadius: "10px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "11px", color: "#d6bb32" }}>内存</div>
              <div
                style={{
                  fontSize: "15px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                -18%
              </div>
            </div>
          </div>
        </div>,
        "柔和科技卡片风"
      )}

      {renderCard(
        // 现代商务资讯卡片风 (来自页面1)
        <div
          className="preview-card-business_info"
          style={{
            width: "300px",
            height: "400px",
            background: "linear-gradient(135deg, #0d553f 0%, #0b4a37 100%)",
            padding: "0",
            color: "white",
            display: "flex",
            flexDirection: "column",
            borderRadius: "10px",
            boxShadow: "0 12px 28px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              padding: "25px",
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ0cmFuc3BhcmVudCIvPjxjaXJjbGUgY3g9IjUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iMjUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iMzUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNTUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNjUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNzUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iODUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iOTUiIGN5PSI1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNSIgY3k9IjE1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iMTUiIGN5PSIxNSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMTUiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48Y2lyY2xlIGN4PSIzNSIgY3k9IjE1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNDUiIGN5PSIxNSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjxjaXJjbGUgY3g9IjU1IiBjeT0iMTUiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSkiLz48Y2lyY2xlIGN4PSI2NSIgY3k9IjE1IiByPSIxIiBmaWxsPSJyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iNzUiIGN5PSIxNSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjxjaXJjbGUgY3g9Ijg1IiBjeT0iMTUiIHI9IjEiIGZpbGw9InJnYmEoMjU1NSwgMjU1LCAyNTUsIDAuMDUpIi8+PGNpcmNsZSBjeD0iOTUiIGN5PSIxNSIgcj0iMSIgZmlsbD0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIvPjwvc3ZnPg==')",
              backgroundSize: "50px 50px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "20px",
                    backgroundColor: "#be3b36",
                    borderRadius: "2px",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "12px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    opacity: 0.7,
                  }}
                >
                  季度报告
                </span>
              </div>
              <div style={{ fontSize: "13px", opacity: 0.7 }}>2025年Q2</div>
            </div>
            <h2
              style={{
                fontSize: "26px",
                fontWeight: 700,
                marginBottom: "15px",
                letterSpacing: "-0.5px",
                lineHeight: 1.2,
              }}
            >
              2025年第二季度
              <br />
              市场增长战略分析
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.5,
                marginBottom: "25px",
                opacity: 0.9,
              }}
            >
              在全球市场波动的背景下，我司通过精准定位和数字化转型，实现营收同比增长18.3%，超出行业预期。
            </p>
          </div>
          <div
            style={{
              backgroundColor: "#0a3d2e",
              flexGrow: 1,
              padding: "20px 25px",
            }}
          >
            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  fontSize: "13px",
                  marginBottom: "6px",
                  opacity: 0.8,
                }}
              >
                主要市场表现
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    flexGrow: 1,
                    height: "8px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: "72%",
                      height: "100%",
                      backgroundColor: "#be3b36",
                    }}
                  ></div>
                </div>
                <span style={{ fontSize: "16px", fontWeight: 600 }}>+72%</span>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.7,
                    marginBottom: "5px",
                  }}
                >
                  新客户增长
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700 }}>+24.8%</div>
              </div>
              <div
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.08)",
                  borderRadius: "8px",
                  padding: "15px",
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.7,
                    marginBottom: "5px",
                  }}
                >
                  转化率提升
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700 }}>+12.5%</div>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "15px 25px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#0a3d2e",
              borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div style={{ fontSize: "12px", opacity: 0.6 }}>
              制作：战略部 · 张明
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#be3b36",
                  borderRadius: "50%",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                }}
              ></div>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
          </div>
        </div>,
        "现代商务资讯卡片风"
      )}

      {renderCard(
        // 流动科技蓝风格 (来自页面1)
        <div
          className="preview-card-flowing_tech"
          style={{
            width: "300px",
            height: "400px",
            background: "linear-gradient(135deg, #f5f9ff 0%, #f0f4ff 100%)",
            borderRadius: "15px",
            padding: "0",
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 15px 35px rgba(38, 105, 224, 0.15)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-40px",
              right: "-40px",
              width: "200px",
              height: "200px",
              borderRadius: "50%",
              background:
                "linear-gradient(120deg, rgba(83, 166, 255, 0.15), rgba(130, 202, 255, 0.05))",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-80px",
              left: "-40px",
              width: "250px",
              height: "250px",
              borderRadius: "50%",
              background:
                "linear-gradient(120deg, rgba(83, 166, 255, 0.08), rgba(130, 202, 255, 0.02))",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "28px",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 2L20 7V17L12 22L4 17V7L12 2Z"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div
                  style={{
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#1e40af",
                  }}
                >
                  CloudSync Pro
                </div>
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  backgroundColor: "rgba(219, 234, 254, 0.7)",
                  padding: "4px 12px",
                  borderRadius: "20px",
                }}
              >
                Beta
              </div>
            </div>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                color: "#1e293b",
                marginBottom: "15px",
              }}
            >
              云端同步技术
              <br />
              <span
                style={{
                  background: "linear-gradient(90deg, #3b82f6, #60a5fa)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                无缝连接，智能协作
              </span>
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#475569",
                marginBottom: "25px",
              }}
            >
              CloudSync
              Pro采用先进的流式同步技术，让您的数据在多设备间实时流动，
              <span style={{ color: "#2563eb", fontWeight: 500 }}>
                提升协作效率高达82%
              </span>
              。
            </p>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.8)",
                borderRadius: "12px",
                padding: "18px",
                marginBottom: "20px",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.03)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "15px",
                }}
              >
                <div
                  style={{
                    width: "38px",
                    height: "38px",
                    borderRadius: "38px",
                    background: "linear-gradient(135deg, #bfdbfe, #93c5fd)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
                      stroke="#1e40af"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#1e293b",
                    }}
                  >
                    Smart Sync™ 技术
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    智能识别与优先级排序
                  </div>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginTop: "12px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#475569" }}>
                    传输速度
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "6px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "85%",
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #3b82f6, #60a5fa)",
                        }}
                      ></div>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#334155",
                        fontWeight: 500,
                      }}
                    >
                      85%
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#475569" }}>
                    同步成功率
                  </span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "120px",
                        height: "6px",
                        backgroundColor: "#e2e8f0",
                        borderRadius: "3px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          width: "99%",
                          height: "100%",
                          background:
                            "linear-gradient(90deg, #3b82f6, #60a5fa)",
                        }}
                      ></div>
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        color: "#334155",
                        fontWeight: 500,
                      }}
                    >
                      99%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#bfdbfe",
                    borderRadius: "50%",
                  }}
                ></span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#60a5fa",
                    borderRadius: "50%",
                  }}
                ></span>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                  }}
                ></span>
              </div>
              <div style={{ fontSize: "12px", color: "#64748b" }}>
                Version 2.4.8
              </div>
            </div>
          </div>
        </div>,
        "流动科技蓝风格"
      )}

      {renderCard(
        // 极简格栅主义封面风格 (来自页面1)
        <div
          className="preview-card-minimalist_grid"
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#f8f8f8",
            padding: "0",
            display: "grid",
            gridTemplateRows: "65% 35%",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
          }}
        >
          <div
            style={{
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.85,
                background:
                  "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjI2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDEwMCAwIEwgMCAwIDAgMTAwIiBmaWxsPSJub25lIiBzdHJva2U9ImdyYXkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iYmxhY2siLz48L3N2Zz4=')",
                backgroundSize: "cover",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                right: "25px",
                width: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: "20px",
              }}
            >
              <div
                style={{
                  width: "1px",
                  height: "60px",
                  backgroundColor: "#fff",
                  marginBottom: "15px",
                }}
              ></div>
              <div
                style={{
                  transform: "rotate(90deg)",
                  transformOrigin: "center",
                  whiteSpace: "nowrap",
                  color: "#fff",
                  fontSize: "12px",
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  marginTop: "40px",
                }}
              >
                设计理念 2025
              </div>
            </div>
            <div style={{ zIndex: 2, padding: "0 50px", textAlign: "left" }}>
              <div
                style={{
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "8px",
                  fontWeight: 300,
                  letterSpacing: "1px",
                }}
              >
                极简主义系列
              </div>
              <h2
                style={{
                  color: "white",
                  fontSize: "36px",
                  lineHeight: 1.1,
                  fontWeight: 700,
                  marginBottom: "20px",
                  letterSpacing: "-1px",
                }}
              >
                格栅
                <br />
                构成
              </h2>
              <div
                style={{
                  width: "35px",
                  height: "4px",
                  backgroundColor: "#fff",
                  marginBottom: "15px",
                }}
              ></div>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  maxWidth: "200px",
                  fontWeight: 400,
                }}
              >
                探索几何格栅与空间结构的平衡关系，通过精准定位与留白创造秩序美学。
              </p>
            </div>
            <div
              style={{
                position: "absolute",
                width: "80px",
                height: "80px",
                border: "1px solid rgba(255,255,255,0.2)",
                top: "20px",
                left: "20px",
              }}
            ></div>
            <div
              style={{
                position: "absolute",
                width: "120px",
                height: "1px",
                backgroundColor: "rgba(255,255,255,0.3)",
                bottom: "40px",
                left: "30px",
              }}
            ></div>
          </div>
          <div
            style={{
              padding: "25px",
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gridTemplateRows: "auto 1fr",
              gap: "15px",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                gridColumn: "1 / 3",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#888",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                }}
              >
                设计总监：XX
              </div>
              <div style={{ fontSize: "11px", color: "#888" }}>Vol. 08</div>
            </div>
            <div
              style={{
                gridColumn: "1 / 2",
                gridRow: "2 / 3",
                paddingRight: "15px",
                borderRight: "1px solid #eee",
              }}
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "14px",
                  color: "#333",
                  marginBottom: "8px",
                }}
              >
                工业设计中的网格布局
              </div>
              <p
                style={{
                  fontSize: "13px",
                  lineHeight: 1.5,
                  color: "#666",
                }}
              >
                研究表明，严格的几何网格可创造最优视觉体验，使观者在复杂信息中建立清晰认知路径。
              </p>
            </div>
            <div
              style={{
                gridColumn: "2 / 3",
                gridRow: "2 / 3",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "20px",
                    height: "1px",
                    backgroundColor: "#000",
                  }}
                ></div>
              </div>
              <div
                style={{
                  fontSize: "10px",
                  color: "#888",
                  fontStyle: "italic",
                }}
              >
                设计学院出版社
                <br />
                于2025年3月创刊
              </div>
            </div>
          </div>
        </div>,
        "极简格栅主义封面风格"
      )}

      {renderCard(
        // 数字极简票券风 (来自页面1)
        <div
          className="preview-card-digital_minimal"
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            padding: "0",
            position: "relative",
            fontFamily: "'SF Mono', 'Courier New', monospace",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "15px",
              left: "15px",
              right: "15px",
              bottom: "15px",
              border: "1px solid #ddd",
              pointerEvents: "none",
              zIndex: 2,
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px 25px 15px",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#999",
                    letterSpacing: "1px",
                    marginBottom: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  入场券 / TICKET
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#000",
                    letterSpacing: "-0.5px",
                  }}
                >
                  数字艺术展
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    color: "#999",
                    marginBottom: "3px",
                  }}
                >
                  票号
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#000",
                    letterSpacing: "1px",
                  }}
                >
                  A-10086
                </div>
              </div>
            </div>
            <div style={{ flexGrow: 1, display: "flex", padding: "0 25px" }}>
              <div
                style={{
                  flex: 2,
                  padding: "25px 15px 25px 0",
                  borderRight: "1px solid #eee",
                }}
              >
                <div style={{ marginBottom: "25px" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginBottom: "6px",
                    }}
                  >
                    展览主题
                  </div>
                  <div
                    style={{
                      fontSize: "18px",
                      fontWeight: 500,
                      color: "#000",
                      lineHeight: 1.3,
                    }}
                  >
                    《数字时代的
                    <br />
                    艺术边界》
                  </div>
                </div>
                <div
                  style={{
                    marginBottom: "25px",
                    display: "flex",
                    gap: "30px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#999",
                        marginBottom: "6px",
                      }}
                    >
                      日期
                    </div>
                    <div style={{ fontSize: "14px", color: "#333" }}>
                      2025.06.15
                    </div>
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#999",
                        marginBottom: "6px",
                      }}
                    >
                      时间
                    </div>
                    <div style={{ fontSize: "14px", color: "#333" }}>14:30</div>
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginBottom: "6px",
                    }}
                  >
                    地点
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#333",
                      lineHeight: 1.4,
                    }}
                  >
                    上海当代艺术馆
                    <br />
                    北馆 3F-A展厅
                  </div>
                </div>
              </div>
              <div
                style={{
                  flex: 1,
                  padding: "25px 0 25px 15px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    transform: "rotate(90deg)",
                    transformOrigin: "left center",
                    fontSize: "12px",
                    color: "#999",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    top: "50%",
                    right: "15px",
                  }}
                >
                  DIGITAL ART PASS
                </div>
                <div style={{ marginTop: "auto" }}>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#999",
                      marginBottom: "10px",
                    }}
                  >
                    座位
                  </div>
                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: 600,
                      color: "#000",
                    }}
                  >
                    B-12
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                height: "20px",
                borderTop: "1px dashed #ccc",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: "-10px",
                  top: "-10px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#f0f2f5",
                  borderRadius: "50%",
                }}
              ></div>
              <div
                style={{
                  position: "absolute",
                  right: "-10px",
                  top: "-10px",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#f0f2f5",
                  borderRadius: "50%",
                }}
              ></div>
            </div>
            <div
              style={{
                padding: "15px 25px 25px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "10px",
                    color: "#999",
                    marginBottom: "5px",
                  }}
                >
                  价格
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#000",
                  }}
                >
                  ¥ 128.00
                </div>
              </div>
              <div
                style={{
                  height: "40px",
                  width: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "3px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "3px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "4px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "3px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "4px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "3px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
                <div
                  style={{
                    width: "2px",
                    height: "100%",
                    backgroundColor: "#000",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>,
        "数字极简票券风"
      )}

      {renderCard(
        // 新构成主义教学风 (来自页面1)
        <div
          className="preview-card-new_teaching"
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "white",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            padding: "0",
            borderRadius: 0,
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNIDQwIDAgTCA0MCA0MCBMIDAgNDAgTCAwIDAgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZjBmMGYwIiBzdHJva2Utd2lkdGg9IjEiLz48L3N2Zz4=')",
              backgroundSize: "20px 20px",
              opacity: 0.8,
            }}
          ></div>
          <div
            style={{
              height: "50px",
              backgroundColor: "#000",
              color: "white",
              display: "flex",
              alignItems: "center",
              padding: "0 20px",
              zIndex: 1,
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "1px",
                fontWeight: 500,
              }}
            >
              DESIGN EDUCATION
            </div>
            <div
              style={{
                fontSize: "12px",
                letterSpacing: "1px",
                opacity: 0.7,
              }}
            >
              Vol.04
            </div>
          </div>
          <div
            style={{
              flexGrow: 1,
              padding: "25px",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "25px",
                left: "18px",
                width: "2px",
                height: "180px",
                backgroundColor: "#e30016",
              }}
            ></div>
            <div style={{ marginLeft: "35px", marginBottom: "25px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#000",
                    marginRight: "10px",
                  }}
                ></div>
                <div
                  style={{
                    fontSize: "14px",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  构成理论
                </div>
              </div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: 700,
                  marginBottom: "10px",
                  letterSpacing: "-0.5px",
                }}
              >
                基础形状的
                <br />
                空间构成
              </h2>
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  marginBottom: "5px",
                }}
              >
                <div
                  style={{
                    width: "20px",
                    height: "1px",
                    backgroundColor: "#000",
                    marginTop: "10px",
                  }}
                ></div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  Spatial composition of basic shapes
                </div>
              </div>
            </div>
            <div style={{ display: "flex", marginBottom: "20px" }}>
              <div
                style={{
                  width: "35px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  paddingTop: "5px",
                }}
              >
                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    marginBottom: "15px",
                  }}
                >
                  01
                </div>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                    marginBottom: "50px",
                  }}
                ></div>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                  }}
                ></div>
              </div>
              <div style={{ flexGrow: 1 }}>
                <div style={{ marginBottom: "25px" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    点、线、面的基本关系
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    在构成设计中，点是最基本的视觉元素，线是点的延伸，面是线的延展。三者之间的关系形成了空间构成的基础语言。
                  </p>
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#666",
                      fontStyle: "italic",
                    }}
                  >
                    注：康定斯基理论进一步阐述了点线面的抽象表现力。
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "16px",
                      marginBottom: "10px",
                    }}
                  >
                    形状的平衡与张力
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      lineHeight: 1.5,
                      color: "#333",
                    }}
                  >
                    通过不同形状之间的大小、位置、方向关系，可以创造出平衡或张力的视觉效果。合理利用这种关系能形成稳定而有活力的构成。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              height: "90px",
              backgroundColor: "#fff",
              borderTop: "1px solid #eee",
              display: "flex",
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: "60px",
                backgroundColor: "#e30016",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  color: "white",
                  fontSize: "12px",
                  transform: "rotate(-90deg)",
                  whiteSpace: "nowrap",
                  letterSpacing: "1px",
                }}
              >
                设计学院
              </div>
            </div>
            <div
              style={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: "0 20px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "#000",
                }}
              ></div>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: "20px solid transparent",
                  borderRight: "20px solid transparent",
                  borderBottom: "34px solid #000",
                }}
              ></div>
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  backgroundColor: "#000",
                }}
              ></div>
              <div
                style={{
                  width: "40px",
                  height: "20px",
                  backgroundColor: "#e30016",
                }}
              ></div>
            </div>
          </div>
        </div>,
        "新构成主义教学风"
      )}

      {renderCard(
        // 奢华自然意境风 (来自页面1)
        <div
          className="preview-card-luxury_nature"
          style={{
            width: "300px",
            height: "400px",
            background:
              "linear-gradient(180deg, rgba(12, 37, 29, 0.97) 0%, rgba(12, 32, 24, 0.98) 100%)",
            padding: "0",
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(0, 0, 0, 0.25)",
            borderRadius: "8px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              right: "12px",
              bottom: "12px",
              border: "1px solid rgba(212, 175, 110, 0.3)",
              pointerEvents: "none",
              zIndex: 3,
            }}
          ></div>

          <div
            style={{
              position: "relative",
              zIndex: 4,
              height: "100%",
              padding: "35px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ width: "45px", height: "45px" }}>
                <svg
                  width="45"
                  height="45"
                  viewBox="0 0 45 45"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="22.5"
                    cy="22.5"
                    r="22"
                    fill="none"
                    stroke="#D4AF6E"
                    strokeOpacity="0.6"
                  />
                  <path
                    d="M16 22.5L22.5 29L32 19.5"
                    stroke="#D4AF6E"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "#D4AF6E",
                    marginBottom: "4px",
                  }}
                >
                  THE NATURE SERIES
                </div>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    backgroundColor: "rgba(212, 175, 110, 0.5)",
                  }}
                ></div>
              </div>
            </div>
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  backgroundColor: "rgba(212, 175, 110, 0.7)",
                  marginBottom: "20px",
                }}
              ></div>
              <h2
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "32px",
                  fontWeight: 300,
                  color: "rgba(255, 255, 255, 0.95)",
                  marginBottom: "15px",
                  letterSpacing: "1px",
                  lineHeight: 1.2,
                }}
              >
                山水意境
              </h2>
              <h3
                style={{
                  fontFamily: "'Times New Roman', serif",
                  fontSize: "18px",
                  fontWeight: 300,
                  color: "#D4AF6E",
                  marginBottom: "25px",
                  letterSpacing: "3px",
                  textTransform: "uppercase",
                }}
              >
                LANDSCAPE
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "rgba(255, 255, 255, 0.8)",
                  maxWidth: "220px",
                  marginBottom: "25px",
                  fontWeight: 300,
                }}
              >
                游走于山与水之间，探寻东方美学的永恒意境。此系列作品融合现代艺术与传统韵味，静谧中蕴含无限生机。
              </p>
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  backgroundColor: "rgba(212, 175, 110, 0.7)",
                }}
              ></div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255, 255, 255, 0.6)",
                }}
              >
                <div style={{ marginBottom: "5px" }}>高级典藏系列</div>
                <div>限量发行 · 2025</div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Times New Roman', serif",
                    fontSize: "11px",
                    letterSpacing: "1px",
                    color: "#D4AF6E",
                    marginBottom: "4px",
                  }}
                >
                  EDITION 03/10
                </div>
                <div
                  style={{
                    width: "30px",
                    height: "1px",
                    backgroundColor: "rgba(212, 175, 110, 0.5)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>,
        "奢华意境风格"
      )}

      {renderCard(
        // 新潮工业反叛风 (来自页面1)
        <div
          className="preview-card-industrial_trendy"
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#000",
            color: "white",
            padding: "0",
            position: "relative",
            overflow: "hidden",
            fontFamily: "'Helvetica Neue', 'Arial', sans-serif",
            borderRadius: "8px",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: 0.15,
              background:
                "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMDAwIi8+PGc+PGNpcmNsZSBjeD0iMTUwIiBjeT0iMzAwIiByPSI5MCIgc3Ryb2tlPSIjNDQ0IiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9Im5vbmUiLz48Y2lyY2xlIGN4PSIxNTAiIGN5PSIzMDAiIHI9IjcwIiBzdHJva2U9IiM0NDQiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjE1MCIgY3k9IjMwMCIgcj0iNTAiIHN0cm9rZT0iIzQ0NCIgc3Ryb2tlLXdpZHRoPSIyIiBmaWxsPSJub25lIi8+PC9nPjxsaW5lIHgxPSIwIiB5MT0iMTAwIiB4Mj0iMzAwIiB5Mj0iMTAwIiBzdHJva2U9IiM0NDQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')",
              backgroundSize: "cover",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-30px",
              width: "100px",
              height: "250px",
              backgroundColor: "#ff0000",
              opacity: 0.9,
              transform: "rotate(30deg)",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              padding: "30px 25px",
              position: "relative",
              zIndex: 2,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                marginBottom: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    fontSize: "11px",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                    marginBottom: "8px",
                    opacity: 0.5,
                  }}
                >
                  INDUSTRIAL
                </div>
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: 800,
                    letterSpacing: "-1px",
                    lineHeight: 0.9,
                    marginBottom: "10px",
                  }}
                >
                  反<br />叛<br />
                  设计
                </div>
              </div>
              <div
                style={{
                  fontSize: "24px",
                  fontWeight: 800,
                  opacity: 0.2,
                }}
              >
                #08
              </div>
            </div>
            <div style={{ margin: "40px 0", flexGrow: 1 }}>
              <div
                style={{
                  width: "100%",
                  height: "1px",
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  marginBottom: "20px",
                }}
              ></div>
              <h2
                style={{
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "15px",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                }}
              >
                打破常规的
                <br />
                <span style={{ color: "#ff0000" }}>都市美学</span>
              </h2>
              <p
                style={{
                  fontSize: "14px",
                  lineHeight: 1.5,
                  opacity: 0.7,
                  maxWidth: "240px",
                  marginBottom: "20px",
                }}
              >
                在都市丛林中寻求解构与重组的可能，解放固有思维，探索边界之外的设计语言。
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    border: "1px solid #fff",
                  }}
                ></div>
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    backgroundColor: "#ff0000",
                    transform: "rotate(45deg)",
                  }}
                ></div>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    backgroundColor: "#fff",
                    opacity: 0.5,
                  }}
                ></div>
              </div>
            </div>
            <div style={{ position: "relative", marginTop: "auto" }}>
              <div
                style={{
                  position: "absolute",
                  bottom: "-30px",
                  left: "-10px",
                  fontSize: "110px",
                  fontWeight: 900,
                  opacity: 0.05,
                  lineHeight: 0.8,
                  letterSpacing: "-5px",
                  whiteSpace: "nowrap",
                }}
              >
                TREND TREND
              </div>
              <div
                style={{
                  position: "relative",
                  zIndex: 3,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: "12px",
                      opacity: 0.5,
                      marginBottom: "5px",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "10px",
                        height: "1px",
                        backgroundColor: "#ff0000",
                      }}
                    ></div>
                    MORE INFO
                  </div>
                  <div style={{ fontSize: "16px", fontWeight: 700 }}>
                    城市文化季刊
                  </div>
                </div>
                <div
                  style={{
                    textAlign: "right",
                    fontSize: "12px",
                    opacity: 0.5,
                  }}
                >
                  <div>2025/新潮流派</div>
                  <div
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      opacity: 1,
                    }}
                  >
                    +++
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "10px",
              zIndex: 2,
            }}
          >
            <div style={{ display: "flex", width: "100%", height: "100%" }}>
              <div style={{ flex: 1, backgroundColor: "#ff0000" }}></div>
              <div style={{ flex: 2, backgroundColor: "black" }}></div>
              <div style={{ flex: 1, backgroundColor: "#ff0000" }}></div>
              <div style={{ flex: 3, backgroundColor: "black" }}></div>
              <div style={{ flex: 1, backgroundColor: "#ff0000" }}></div>
            </div>
          </div>
        </div>,
        "新潮工业反叛风"
      )}

      {renderCard(
        // 软萌知识卡片风 (来自页面1)
        <div
          className="preview-card-cute_knowledge"
          style={{
            width: "300px",
            height: "400px",
            background: "linear-gradient(135deg, #ffdfef 0%, #fff2f9 100%)",
            padding: "20px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
            boxShadow:
              "0 10px 30px rgba(255, 165, 210, 0.25), 0 4px 10px rgba(255, 182, 193, 0.15)",
            fontFamily: "'PingFang SC', 'Microsoft YaHei', sans-serif",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-20px",
              right: "-20px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(255, 182, 193, 0.3), rgba(255, 150, 180, 0.1))",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "-40px",
              left: "-30px",
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              background:
                "linear-gradient(135deg, rgba(255, 182, 193, 0.2), rgba(255, 150, 180, 0.05))",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
              position: "relative",
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                marginRight: "12px",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#ffb6c1",
                  borderRadius: "50%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    left: "10px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#333",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "15px",
                    right: "10px",
                    width: "8px",
                    height: "8px",
                    backgroundColor: "#333",
                    borderRadius: "50%",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "28px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "12px",
                    height: "6px",
                    backgroundColor: "#333",
                    borderRadius: "6px 6px 12px 12px",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    left: "6px",
                    width: "14px",
                    height: "14px",
                    backgroundColor: "#ffb6c1",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                ></div>
                <div
                  style={{
                    position: "absolute",
                    top: "-6px",
                    right: "6px",
                    width: "14px",
                    height: "14px",
                    backgroundColor: "#ffb6c1",
                    borderRadius: "50%",
                    border: "2px solid #fff",
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#ff6b95",
                  marginBottom: "2px",
                }}
              >
                知识小贴士
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#ff96b4",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <span>今日分享</span>
                <span
                  style={{
                    display: "inline-block",
                    width: "4px",
                    height: "4px",
                    backgroundColor: "#ffb6c1",
                    borderRadius: "50%",
                    margin: "0 6px",
                  }}
                ></span>
                <span>超简单～</span>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              borderRadius: "16px",
              padding: "20px",
              marginBottom: "15px",
              position: "relative",
              zIndex: 2,
              boxShadow: "0 4px 15px rgba(255, 182, 193, 0.12)",
              flexGrow: 1,
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#333",
                marginBottom: "12px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "18px",
                  height: "18px",
                  backgroundColor: "#ff96b4",
                  borderRadius: "50%",
                  marginRight: "8px",
                  color: "white",
                  fontSize: "12px",
                  textAlign: "center",
                  lineHeight: "18px",
                }}
              >
                ?
              </span>
              为什么天空是蓝色的？
            </h3>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.5,
                color: "#555",
                marginBottom: "15px",
              }}
            >
              当阳光穿过大气层时，蓝色光波会被空气分子散射得更多！这被称为
              <span style={{ color: "#ff6b95", fontWeight: 500 }}>
                「瑞利散射」
              </span>
              效应，让我们看到的天空呈现蓝色～
            </p>
            <div
              style={{
                backgroundColor: "rgba(255, 182, 193, 0.1)",
                borderRadius: "10px",
                padding: "10px",
                borderLeft: "3px solid #ff96b4",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#ff6b95",
                  fontWeight: 500,
                  marginBottom: "5px",
                }}
              >
                小知识
              </div>
              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  lineHeight: 1.4,
                }}
              >
                日出日落时，阳光需要穿过更厚的大气层，蓝光被散射得更多，所以我们看到的是红色和橙色哦！
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 5px",
              position: "relative",
              zIndex: 2,
              marginTop: "auto",
            }}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  width: "28px",
                  height: "28px",
                  backgroundColor: "#ff96b4",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "5px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="white"
                  />
                </svg>
              </div>
              <span style={{ fontSize: "13px", color: "#ff6b95" }}>
                1.2k喜欢
              </span>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#ff96b4",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span>科学小课堂</span>
              <span
                style={{
                  display: "inline-block",
                  width: "4px",
                  height: "4px",
                  backgroundColor: "#ffb6c1",
                  borderRadius: "50%",
                  margin: "0 6px",
                }}
              ></span>
              <span>Vol.08</span>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "80px",
              right: "15px",
              width: "20px",
              height: "20px",
              backgroundColor: "rgba(255, 182, 193, 0.3)",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "70px",
              left: "25px",
              width: "15px",
              height: "15px",
              backgroundColor: "rgba(255, 182, 193, 0.3)",
              borderRadius: "50%",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              right: "40px",
              width: "10px",
              height: "10px",
              backgroundColor: "rgba(255, 182, 193, 0.3)",
              borderRadius: "50%",
            }}
          ></div>
        </div>,
        "软萌知识卡片风"
      )}

      {renderCard(
        // 商务简约信息卡片风 (来自页面1)
        <div
          className="preview-card-business_simple"
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#ffffff",
            padding: "30px",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
            fontFamily:
              "'PingFang SC', 'SF Pro Display', 'Helvetica Neue', sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "25px",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#999",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}
              >
                PRODUCT SHEET
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    backgroundColor: "#1a73e8",
                    borderRadius: "4px",
                    marginRight: "6px",
                  }}
                ></div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  DataSync Plus
                </div>
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#f0f4f8",
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderLeft: "2px solid #1a73e8",
                  borderBottom: "2px solid #1a73e8",
                  transform: "rotate(-45deg)",
                }}
              ></div>
            </div>
          </div>
          <div style={{ marginBottom: "25px", flexGrow: 1 }}>
            <h2
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#333",
                marginBottom: "15px",
              }}
            >
              企业级数据同步解决方案
            </h2>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.6,
                color: "#666",
                marginBottom: "20px",
              }}
            >
              DataSync
              Plus为企业提供可靠、安全且高效的数据同步服务，支持多平台无缝对接，确保您的数据始终保持一致性。
            </p>
            <div style={{ marginBottom: "20px" }}>
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                主要特性
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "18px",
                      height: "18px",
                      backgroundColor: "#eaf2fd",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#1a73e8",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: 1.4,
                    }}
                  >
                    实时同步，延迟低至0.1秒
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "18px",
                      height: "18px",
                      backgroundColor: "#eaf2fd",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#1a73e8",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: 1.4,
                    }}
                  >
                    端到端加密，保障数据安全
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      minWidth: "18px",
                      height: "18px",
                      backgroundColor: "#eaf2fd",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "2px",
                    }}
                  >
                    <div
                      style={{
                        width: "6px",
                        height: "6px",
                        backgroundColor: "#1a73e8",
                        borderRadius: "50%",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      fontSize: "14px",
                      color: "#444",
                      lineHeight: 1.4,
                    }}
                  >
                    支持多平台部署与集成
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 调整价格信息位置以适应高度 */}
          <div
            style={{
              backgroundColor: "#f8fafd",
              padding: "15px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#333",
                }}
              >
                企业版
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: 700,
                  color: "#1a73e8",
                }}
              >
                ¥1,999
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#666",
                  }}
                >
                  /月
                </span>
              </div>
            </div>
            {/* 省略详细价格特性以节省空间 */}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "auto",
            }}
          >
            <div style={{ fontSize: "12px", color: "#666" }}>
              sales@datasync.com
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#eaf2fd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#1a73e8",
                    maskImage:
                      "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwIDRIMWExIDEgMCAwIDAtMSAxdjE0YTEgMSAwIDAgMCAxIDFoMTlhMSAxIDAgMCAwIDEtMVY1YTEgMSAwIDAgMC0xLTF6bS0xLjQgMy45bC03LjEgNWEuOS45IDAgMCAxLTEgMGwtNy4xLTVjLS41LS4zLS42LTEtLjEtMS4zbC4yLS4yYy40LS4yLjktLjIgMS4zLjFsNi4xIDQuM2E0OC4yIDQ4LjIgMCAwIDAgNi4xLTQuM2MuNC0uMy45LS4zIDEuMy0uMWwuMi4yYy41LjQuNC45LS4xIDEuMyIvPjwvc3ZnPg==')",
                    WebkitMaskImage:
                      "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIwIDRIMWExIDEgMCAwIDAtMSAxdjE0YTEgMSAwIDAgMCAxIDFoMTlhMSAxIDAgMCAwIDEtMVY1YTEgMSAwIDAgMC0xLTF6bS0xLjQgMy45bC03LjEgNWEuOS45IDAgMCAxLTEgMGwtNy4xLTVjLS41LS4zLS42LTEtLjEtMS4zbC4yLS4yYy40LS4yLjktLjIgMS4zLjFsNi4xIDQuM2E0OC4yIDQ4LjIgMCAwIDAgNi4xLTQuM2MuNC0uMy45LS4zIDEuMy0uMWwuMi4yYy41LjQuNC45LS4xIDEuMyIvPjwvc3ZnPg==')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "12px",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "12px",
                  }}
                ></div>{" "}
              </div>
              <div
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  backgroundColor: "#eaf2fd",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {" "}
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "#1a73e8",
                    maskImage:
                      "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE3LjA3NyAxMS4wMzJhLjY1Ni42NTYgMCAwIDAgMS40NTktLjA2NXYtLjc2Yy4wNjUtMy4yMzktMi42MTQtNC44OTQtNi4wNTMtNC44OTQtMy40MDcgMC02LjA4NSAxLjc2OC02LjA4NSA1LjQxN3YzLjA4YzAgMy42NDkgMi42NzggNS40MTYgNi4wODUgNS40MTYgMy40MzkgMCA2LjA1My0xLjY1NCA2LjA1My00Ljg5NHYtLjc2YS42NDMuNjQzIDAgMCAwLS41ODMtLjcxMi42NTYuNjU2IDAgMCAwLS44NzYuNjQ3LjQyNy40MjcgMCAwIDAgMCAuMDY1djEuMDQ2YzAgMi4zMzYtMS45MjMgMy41My00LjU5NCAzLjUzLTIuNjcxIDAtNC42MjYtMS4zLTQuNjI2LTQuMDUxVjEwLjczYzAtMi43NSAxLjk1NS00LjA1MSA0LjYyNi00LjA1MSAyLjY3IDAgNC41OTQgMS4xOTUgNC41OTQgMy41MzF2MS4wNDVNMjQgMTEuOTg1YzAgNi42MTUtNS4zODYgMTItMTIgMTJTMCAxOC42IDE5LjM4NSAwIDUuMzg1IDYgMTIgNnMxMiA1LjM4NiAxMiAxMiIvPjwvc3ZnPg==')",
                    WebkitMaskImage:
                      "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTE3LjA3NyAxMS4wMzJhLjY1Ni42NTYgMCAwIDAgMS40NTktLjA2NXYtLjc2Yy4wNjUtMy4yMzktMi42MTQtNC44OTQtNi4wNTMtNC44OTQtMy40MDcgMC02LjA4NSAxLjc2OC02LjA4NSA1LjQxN3YzLjA4YzAgMy42NDkgMi42NzggNS40MTYgNi4wODUgNS40MTYgMy40MzkgMCA2LjA1My0xLjY1NCA2LjA1My00Ljg5NHYtLjc2YS42NDMuNjQzIDAgMCAwLS41ODMtLjcxMi42NTYuNjU2IDAgMCAwLS44NzYuNjQ3LjQyNy40MjcgMCAwIDAgMCAuMDY1djEuMDQ2YzAgMi4zMzYtMS45MjMgMy41My00LjU5NCAzLjUzLTIuNjcxIDAtNC42MjYtMS4zLTQuNjI2LTQuMDUxVjEwLjczYzAtMi43NSAxLjk1NS00LjA1MSA0LjYyNi00LjA1MSAyLjY3IDAgNC41OTQgMS4xOTUgNC41OTQgMy41MzF2MS4wNDVNMjQgMTEuOTg1YzAgNi42MTUtNS4zODYgMTItMTIgMTJTMCAxOC42IDE5LjM4NSAwIDUuMzg1IDYgMTIgNnMxMiA1LjM4NiAxMiAxMiIvPjwvc3ZnPg==')",
                    WebkitMaskRepeat: "no-repeat",
                    WebkitMaskPosition: "center",
                    WebkitMaskSize: "12px",
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "12px",
                  }}
                ></div>{" "}
              </div>
            </div>
          </div>
        </div>,
        "商务简约信息卡片风"
      )}
    </div>
  );
};

export default ClaudeCards;
