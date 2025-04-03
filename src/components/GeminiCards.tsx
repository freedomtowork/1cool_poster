import React from "react";

// 复制 renderCard 函数到这里 (或者创建一个共享的 utils 文件)
const renderCard = (cardHtml: JSX.Element, styleName: string) => (
  <div className="card-wrapper">
    <div className="card-inner-content">{cardHtml}</div>
    <div className="card-style-overlay">{styleName}</div>
  </div>
);

const GeminiCards: React.FC = () => {
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
        // 柔和科技卡片风 (来自页面2)
        <div
          className="preview-card-tech_card"
          style={{
            width: "240px",
            height: "320px",
            background: "linear-gradient(135deg, #f3e7e9, #e8e0f8)",
            borderRadius: "16px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            fontFamily: "'PingFang SC', 'Helvetica Neue', Arial, sans-serif",
            color: "#555",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#FFD1DC",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "10px",
                fontSize: "18px",
                color: "#fff",
              }}
            >
              💡
            </div>
            <span
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "#6A5ACD",
              }}
            >
              智能洞察
            </span>
          </div>
          <div style={{ flexGrow: 1 }}>
            <h3
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#6A5ACD",
                margin: "10px 0 5px 0",
                lineHeight: 1.2,
              }}
            >
              75
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "normal",
                  color: "#888",
                }}
              >
                %
              </span>
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#777",
                marginBottom: "15px",
                lineHeight: 1.6,
              }}
            >
              用户活跃度提升显著，关键指标超预期。Data Insight Pro.
            </p>
            <div style={{ marginBottom: "15px" }}>
              <div
                style={{
                  fontSize: "11px",
                  color: "#aaa",
                  marginBottom: "4px",
                }}
              >
                任务进度
              </div>
              <div
                style={{
                  height: "6px",
                  backgroundColor: "#eee",
                  borderRadius: "3px",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: "60%",
                    height: "100%",
                    background: "linear-gradient(90deg, #FFFACD, #FFD1DC)",
                    borderRadius: "3px",
                  }}
                ></div>
              </div>
            </div>
            <div style={{ fontSize: "11px", color: "#aaa" }}>
              更新于: Just Now
            </div>
          </div>
          <div
            style={{
              width: "100px",
              height: "100px",
              background:
                "linear-gradient(45deg, rgba(255, 250, 205, 0.3), rgba(255, 209, 220, 0.3))",
              borderRadius: "50%",
              position: "absolute",
              bottom: "-30px",
              right: "-30px",
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              fontSize: "10px",
              color: "#ccc",
              textAlign: "right",
              marginTop: "10px",
              zIndex: 1,
            }}
          >
            Powered by AI Engine
          </div>
        </div>,
        "柔和科技卡片风"
      )}

      {renderCard(
        // 现代商务资讯卡片风 (来自页面2)
        <div
          className="preview-card-business_info"
          style={{
            width: "240px",
            height: "320px",
            backgroundColor: "#004d40",
            borderRadius: "12px",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Roboto', 'Noto Sans SC', sans-serif",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "10px 10px",
              opacity: 0.5,
            }}
          ></div>
          <div style={{ zIndex: 1 }}>
            <h2
              style={{
                fontSize: "22px",
                fontWeight: 700,
                margin: "0 0 15px 0",
                lineHeight: 1.3,
                textAlign: "left",
              }}
            >
              全球宏观经济趋势分析报告 Q3 Update
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#b2dfdb",
                margin: "0 0 20px 0",
                lineHeight: 1.7,
                textAlign: "left",
              }}
            >
              深度解读最新市场动态与未来投资策略。Focus on Stability & Growth.
            </p>
            <div style={{ marginBottom: "20px" }}>
              <span
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  fontSize: "10px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                  marginRight: "5px",
                }}
              >
                重要
              </span>
              <span
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontSize: "10px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  display: "inline-block",
                }}
              >
                策略分析
              </span>
            </div>
            <div
              style={{
                height: "4px",
                backgroundColor: "rgba(255,255,255,0.3)",
                borderRadius: "2px",
                marginBottom: "25px",
              }}
            >
              <div
                style={{
                  width: "80%",
                  height: "100%",
                  backgroundColor: "#FFCC80",
                  borderRadius: "2px",
                }}
              ></div>
            </div>
            <div
              style={{
                fontSize: "12px",
                color: "#80cbc4",
                textAlign: "left",
              }}
            >
              发布日期: 2025/03/26
            </div>
          </div>
        </div>,
        "现代商务资讯卡片风"
      )}

      {renderCard(
        // 流动科技蓝风格 (来自页面2)
        <div
          className="preview-card-flowing_tech"
          style={{
            width: "240px",
            height: "320px",
            background: "linear-gradient(180deg, #ffffff 70%, #e0f2f7)",
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Inter', 'SF Pro Display', sans-serif",
            color: "#333",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 2px 10px rgba(70, 130, 180, 0.1)",
          }}
        >
          <div
            style={{
              width: "150%",
              height: "150px",
              background:
                "linear-gradient(45deg, rgba(70, 130, 180, 0.15), rgba(173, 216, 230, 0.05))",
              position: "absolute",
              top: "-50px",
              left: "-50px",
              transform: "rotate(-20deg)",
              borderRadius: "50px",
              zIndex: 0,
            }}
          ></div>
          <div
            style={{
              zIndex: 1,
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#005A9C",
                margin: "0 0 10px 0",
                lineHeight: 1.3,
              }}
            >
              云原生架构 Next Gen
            </h3>
            <p
              style={{
                fontSize: "13px",
                color: "#555",
                margin: "0 0 15px 0",
                lineHeight: 1.6,
              }}
            >
              探索下一代 Cloud Native 技术，加速数字化转型。 Efficiency &
              Scalability.
            </p>
            <div style={{ marginTop: "auto" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "15px",
                }}
              >
                <span
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    color: "#4682B4",
                    marginRight: "5px",
                  }}
                >
                  99.9
                </span>
                <span style={{ fontSize: "14px", color: "#4682B4" }}>
                  % uptime
                </span>
              </div>
              <button
                style={{
                  background: "linear-gradient(90deg, #4682B4, #5F9EA0)",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "20px",
                  fontSize: "12px",
                  cursor: "pointer",
                  fontWeight: 500,
                }}
              >
                了解更多 →
              </button>
            </div>
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "#aaa",
              textAlign: "right",
              zIndex: 1,
              marginTop: "10px",
            }}
          >
            Version 3.0
          </div>
        </div>,
        "流动科技蓝风格"
      )}

      {renderCard(
        // 极简格栅主义封面风格 (来自页面2)
        <div
          className="preview-card-minimalist_grid"
          style={{
            width: "240px",
            height: "320px",
            backgroundColor: "#ffffff",
            border: "1px solid #000",
            padding: "0",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              height: "160px",
              backgroundColor: "#e0e0e0",
              margin: "15px 15px 0 15px",
              /* Placeholder for image */ display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#aaa",
              fontSize: "14px",
            }}
          >
            [ IMAGE AREA ]
          </div>
          <div
            style={{
              padding: "15px",
              flexGrow: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#000000",
                  margin: "0 0 5px 0",
                  lineHeight: 1.1,
                  letterSpacing: "-1px",
                }}
              >
                构<br />造
                <span
                  style={{
                    fontSize: "18px",
                    fontWeight: "normal",
                    letterSpacing: 0,
                  }}
                >
                  主义
                </span>
              </h2>
              <p
                style={{
                  fontSize: "12px",
                  color: "#555",
                  margin: "0 0 10px 0",
                  lineHeight: 1.5,
                }}
              >
                探索形式与功能的边界。 Grid System & Typography Exploration.
              </p>
            </div>
            <div
              style={{
                borderTop: "1px solid #000",
                paddingTop: "10px",
                fontSize: "10px",
                color: "#777",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>ISSUE #03</span>
              <span>DESIGN THEORY</span>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              width: "10px",
              height: "10px",
              border: "1px solid #000",
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              bottom: "5px",
              left: "5px",
              writingMode: "vertical-rl",
              fontSize: "9px",
              color: "#aaa",
              letterSpacing: "1px",
            }}
          >
            MINIMALISM
          </div>
        </div>,
        "极简格栅主义封面风格"
      )}

      {renderCard(
        // 数字极简票券风 (来自页面2)
        <div
          className="preview-card-digital_minimal"
          style={{
            width: "240px",
            height: "320px",
            backgroundColor: "#000000",
            border: "1px solid #555",
            padding: "20px",
            display: "flex",
            fontFamily: "'Courier New', monospace",
            color: "#ffffff",
            position: "relative",
          }}
        >
          <div
            style={{
              width: "65%",
              paddingRight: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "normal",
                  margin: "0 0 10px 0",
                  letterSpacing: "1px",
                }}
              >
                ACCESS PASS
              </h3>
              <p
                style={{
                  fontSize: "14px",
                  margin: "0 0 20px 0",
                  lineHeight: 1.6,
                }}
              >
                数字艺术展
                <br />
                Digital Art Expo '24
              </p>
              <p style={{ fontSize: "11px", color: "#aaa", margin: "0" }}>
                Valid Until: 2024/12/31
              </p>
            </div>
            <div style={{ fontSize: "10px", color: "#777" }}>
              REF: #DXP007A1
            </div>
          </div>
          <div
            style={{
              width: "1px",
              backgroundColor: "#555",
              height: "100%",
              position: "absolute",
              left: "calc(65% + 10px)",
              top: 0,
              borderLeft: "1px dashed #777",
            }}
          ></div>
          <div
            style={{
              width: "35%",
              paddingLeft: "25px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <div
              style={{
                writingMode: "vertical-rl",
                textOrientation: "mixed",
                fontSize: "16px",
                letterSpacing: "3px",
                marginBottom: "20px",
              }}
            >
              入场券
            </div>
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              A7
            </div>
            <div style={{ fontSize: "10px", color: "#aaa" }}>SEAT / 区</div>
            <div style={{ marginTop: "30px", fontSize: "20px" }}>→</div>
          </div>
        </div>,
        "数字极简票券风"
      )}

      {renderCard(
        // 新构成主义教学风 (来自页面2)
        <div
          className="preview-card-new_teaching"
          style={{
            width: "240px",
            height: "320px",
            backgroundColor: "#ffffff",
            border: "1px solid #000",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Noto Sans SC', 'Arial', sans-serif",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              borderBottom: "2px solid #000",
              paddingBottom: "5px",
              marginBottom: "15px",
            }}
          >
            <span
              style={{
                fontSize: "11px",
                fontWeight: "bold",
                color: "#000",
              }}
            >
              LESSON.01
            </span>
            <span style={{ fontSize: "10px", color: "#555" }}>
              基础构成 / Basic Composition
            </span>
          </div>
          <h2
            style={{
              fontSize: "36px",
              fontWeight: 900,
              color: "#000000",
              margin: "0 0 10px 0",
              lineHeight: 1.0,
              letterSpacing: "-1px",
            }}
          >
            网格
            <sup
              style={{
                fontSize: "12px",
                color: "#FF0000",
                top: "-1.5em",
                marginLeft: "2px",
              }}
            >
              [1]
            </sup>
            <br />
            系统
          </h2>
          <p
            style={{
              fontSize: "12px",
              color: "#333",
              margin: "0 0 15px 0",
              lineHeight: 1.7,
            }}
          >
            设计中的秩序与结构。The Grid System as Foundation for Visual
            Hierarchy and Order.
          </p>
          <div
            style={{
              border: "1px solid #eee",
              padding: "8px",
              marginBottom: "15px",
            }}
          >
            <p
              style={{
                fontSize: "10px",
                color: "#FF0000",
                margin: "0 0 5px 0",
                fontWeight: "bold",
              }}
            >
              *关键概念: 对齐 / Alignment
            </p>
            <p style={{ fontSize: "10px", color: "#555", margin: "0" }}>
              确保元素在视觉上的关联性。
            </p>
          </div>
          <div
            style={{
              marginTop: "auto",
              borderTop: "1px dashed #ccc",
              paddingTop: "10px",
            }}
          >
            <p style={{ fontSize: "9px", color: "#777", margin: "0" }}>
              [1]
              网格系统是一种通过相交的直线（垂直、水平）组成的结构，用于组织内容。
            </p>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#FF0000",
                position: "absolute",
                bottom: "15px",
                right: "15px",
              }}
            ></div>
          </div>
        </div>,
        "新构成主义教学风"
      )}

      {renderCard(
        // 奢华自然意境风 (来自页面2)
        <div
          className="preview-card-luxury_nature"
          style={{
            width: "240px",
            height: "320px",
            background:
              "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.7)), url('https://via.placeholder.com/240x320/5C5C5C/8B7355?text=Nature+BG') no-repeat center center",
            backgroundSize: "cover",
            borderRadius: "8px",
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            fontFamily: "'Songti SC', 'Garamond', serif",
            color: "#ffffff",
            position: "relative",
            boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "25px",
              left: "25px",
              fontSize: "12px",
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "1px",
            }}
          >
            境 • 界
          </div>
          <div
            style={{
              position: "absolute",
              top: "25px",
              right: "25px",
              fontSize: "20px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {" "}
            L N{" "}
          </div>

          <h2
            style={{
              fontSize: "26px",
              fontWeight: "normal",
              margin: "0 0 10px 0",
              lineHeight: 1.4,
              textShadow: "0 1px 3px rgba(0,0,0,0.5)",
            }}
          >
            静谧
            <span
              style={{
                fontFamily: "'Helvetica Neue', sans-serif",
                fontSize: "14px",
                opacity: 0.8,
                marginLeft: "5px",
              }}
            >
              Serenity
            </span>
            <br />
            时光之屿
          </h2>
          <p
            style={{
              fontSize: "13px",
              color: "rgba(255,255,255,0.8)",
              margin: "0 0 20px 0",
              lineHeight: 1.7,
            }}
          >
            于自然光影间，寻觅内心平和。Find your inner peace amidst nature's
            embrace.
          </p>
          <div
            style={{
              fontSize: "11px",
              color: "rgba(184, 134, 11, 0.9)",
              /* Gold accent */ borderTop: "1px solid rgba(184, 134, 11, 0.4)",
              paddingTop: "10px",
            }}
          >
            探索体验 →
          </div>
        </div>,
        "奢华自然意境风"
      )}

      {renderCard(
        // 新潮工业反叛风 (来自页面2)
        <div
          className="preview-card-industrial_trendy"
          style={{
            width: "240px",
            height: "320px",
            backgroundColor: "#000000",
            border: "2px solid #555",
            padding: "15px",
            fontFamily: "'Impact', 'Arial Black', sans-serif",
            color: "#ffffff",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              fontSize: "10px",
              color: "#888",
              letterSpacing: "1px",
            }}
          >
            TYPE: REBEL / ID: 707
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              fontSize: "20px",
              color: "#FF00FF",
            }}
          >
            * * *
          </div>

          <h2
            style={{
              fontSize: "70px",
              fontWeight: "bold",
              margin: "40px 0 0 0",
              lineHeight: 0.9,
              textAlign: "center",
              position: "relative",
              zIndex: 1,
            }}
          >
            失<br />序
          </h2>
          <p
            style={{
              fontSize: "12px",
              fontFamily: "'Courier New', monospace",
              color: "#00FF00",
              /* Neon Green */ textAlign: "center",
              margin: "10px 0 0 0",
              letterSpacing: "1px",
              zIndex: 1,
              position: "relative",
            }}
          >
            [ DISORDER ] BREAK THE RULES
          </p>

          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: "100px",
              color: "rgba(255, 255, 255, 0.05)",
              fontWeight: "bold",
              zIndex: 0,
              letterSpacing: "-5px",
              userSelect: "none",
            }}
          >
            NOISE
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "15px",
              fontSize: "14px",
              fontFamily: "'Arial', sans-serif",
              color: "#aaa",
            }}
          >
            20 // 24
          </div>
          <div
            style={{
              width: "100%",
              height: "3px",
              backgroundColor: "#fff",
              position: "absolute",
              top: "140px",
              left: 0,
            }}
          ></div>
          <div
            style={{
              width: "3px",
              height: "100%",
              backgroundColor: "#fff",
              position: "absolute",
              top: 0,
              left: "60px",
            }}
          ></div>
        </div>,
        "新潮工业反叛风"
      )}

      {renderCard(
        // 软萌知识卡片风 (来自页面2)
        <div
          className="preview-card-cute_knowledge"
          style={{
            width: "240px",
            height: "320px",
            background: "linear-gradient(135deg, #FFF0F5, #FFFACD)",
            borderRadius: "20px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            fontFamily:
              "'Rounded Mplus 1c', 'Hiragino Maru Gothic ProN', sans-serif",
            color: "#5C4033",
            position: "relative",
            boxShadow: "0 3px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "15px",
              fontSize: "24px",
            }}
          >
            🧠✨
          </div>
          <div style={{ textAlign: "center", marginBottom: "15px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#FFDAB9",
                borderRadius: "50%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "30px",
                marginBottom: "5px",
              }}
            >
              📚
            </div>
            <h3
              style={{
                fontSize: "20px",
                fontWeight: 700,
                color: "#D2691E",
                margin: "0",
              }}
            >
              每日小知识!
            </h3>
          </div>
          <div
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              borderRadius: "10px",
              padding: "15px",
              flexGrow: 1,
            }}
          >
            <p
              style={{
                fontSize: "15px",
                color: "#6B4226",
                margin: "0 0 10px 0",
                lineHeight: 1.7,
              }}
            >
              你知道吗？
              <strong style={{ color: "#CD853F" }}>水熊虫</strong>{" "}
              是地球上生命力最强的生物之一哦！😮
            </p>
            <p
              style={{
                fontSize: "13px",
                color: "#8B5A2B",
                margin: "0",
                lineHeight: 1.6,
              }}
            >
              它们能在极端环境下生存，比如真空、高压、甚至辐射！ Super Cool!
            </p>
          </div>
          <div
            style={{
              fontSize: "11px",
              color: "#B8860B",
              textAlign: "center",
              marginTop: "15px",
            }}
          >
            今天也要元气满满地学习呀~ ( ´ ▽ ` )ﾉ
          </div>
        </div>,
        "软萌知识卡片风"
      )}

      {renderCard(
        // 商务简约信息卡片风 (来自页面2)
        <div
          className="preview-card-business_simple"
          style={{
            width: "240px",
            height: "320px",
            backgroundColor: "#ffffff",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            fontFamily: "'Lato', 'Noto Sans SC', sans-serif",
            color: "#333",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                backgroundColor: "#f0f0f0",
                borderRadius: "6px",
                marginRight: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "18px",
                color: "#4682B4",
              }}
            >
              📊
            </div>
            <div>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#111",
                  margin: "0 0 3px 0",
                }}
              >
                如何提升转化率?
              </h3>
              <p style={{ fontSize: "13px", color: "#555", margin: "0" }}>
                Optimize your sales funnel.
              </p>
            </div>
          </div>
          <div
            style={{
              borderTop: "1px solid #eee",
              paddingTop: "15px",
              flexGrow: 1,
            }}
          >
            <p
              style={{
                fontSize: "14px",
                color: "#444",
                margin: "0 0 15px 0",
                lineHeight: 1.6,
              }}
            >
              <strong style={{ color: "#000" }}>核心策略:</strong>
              <br />
              1. <span style={{ color: "#2E8B57" }}>优化落地页</span> (Improve
              Landing Page)
              <br />
              2. 精准用户画像 (Target Audience)
              <br />
              3. 强化CTA按钮 (Strong Call-to-Action)
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#f8f8f8",
                padding: "8px 12px",
                borderRadius: "4px",
                margin: "20px 0 0 0",
              }}
            >
              {" "}
              {/* Adjusted margin */}
              <span style={{ fontSize: "12px", color: "#666" }}>
                启用 A/B 测试
              </span>
              <div
                style={{
                  width: "30px",
                  height: "16px",
                  backgroundColor: "#4CAF50",
                  borderRadius: "8px",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "white",
                    borderRadius: "50%",
                    position: "absolute",
                    top: "2px",
                    right: "2px",
                  }}
                ></div>
              </div>
            </div>
          </div>
          <div
            style={{
              fontSize: "10px",
              color: "#aaa",
              textAlign: "right",
              borderTop: "1px solid #eee",
              paddingTop: "10px",
              marginTop: "15px",
            }}
          >
            Powered by Insight™
          </div>
        </div>,
        "商务简约信息卡片风"
      )}
    </div>
  );
};

export default GeminiCards;
